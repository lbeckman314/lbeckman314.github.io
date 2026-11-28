// Boot every tool on the Unboxed shelf in a headless browser and check its demo.
//
//   node scripts/unboxed/smoke.mjs                 every entry in catalog.js
//   node scripts/unboxed/smoke.mjs jq sd htop      just these
//   node scripts/unboxed/smoke.mjs unkernel.sh     a repo's .unkernel.sh (simulated)
//
// Serves public/ itself (with HTTP Range, which the distro image needs), opens
// /unboxed/play/?app=<id> (which starts the entry) and waits for its `check` text in
// the terminal. Exits non-zero if any entry fails. Needs Playwright with
// Chromium (npm i --no-save playwright && npx playwright install chromium).
// Set CONCURRENCY to run more entries at once (default 3).

import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { extname, join, normalize } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = fileURLToPath(new URL("../../public/", import.meta.url));
const { CATALOG } = await import(pathToFileURL(join(root, "unboxed/play/catalog.js")).href);

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json" };
const server = createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  let path = normalize(join(root, decodeURIComponent(url.pathname)));
  if (!path.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (path.endsWith("/")) path += "index.html";
  let st;
  try { st = statSync(path); } catch { res.writeHead(404); return res.end(); }
  const headers = { "content-type": TYPES[extname(path)] ?? "application/octet-stream", "accept-ranges": "bytes" };
  const m = /bytes=(\d+)-(\d*)/.exec(req.headers.range ?? "");
  if (m) {
    const start = +m[1], end = m[2] ? +m[2] : st.size - 1;
    res.writeHead(206, { ...headers, "content-range": `bytes ${start}-${end}/${st.size}`, "content-length": end - start + 1 });
    return createReadStream(path, { start, end }).pipe(res);
  }
  res.writeHead(200, { ...headers, "content-length": st.size });
  createReadStream(path).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}/unboxed/play/`;

// Besides the shelf: a repo with a .unkernel.sh, served by intercepting the
// GitHub API and jsDelivr, since no real repo should have to exist for this.
// Its script installs jq from the hosted mirror and runs a file that needs
// its executable bit.
const SHA = "0123456789abcdef0123456789abcdef01234567";
const FAKE = {
  ".unkernel.sh": `#!/bin/sh\nsudo apk add -q jq\nprintf '{"greeting":"hello from .unkernel.sh"}' | jq -r .greeting\n./bin/hello\n`,
  "bin/hello": `#!/bin/sh\necho "bin/hello ran"\n`,
  "README.md": "# hello\n",
};
const UNKERNEL_SH = {
  id: "unkernel.sh", path: "?repo=demo/hello", check: "bin/hello ran",
  async routes(page) {
    const cors = { "access-control-allow-origin": "*" };
    await page.route("https://api.github.com/**", (r) => {
      const u = new URL(r.request().url()).pathname;
      const json = (o) => r.fulfill({ contentType: "application/json", headers: cors, body: JSON.stringify(o) });
      if (u === "/repos/demo/hello") return json({ default_branch: "main" });
      if (u.startsWith("/repos/demo/hello/commits/")) return json({ sha: SHA });
      if (u.startsWith("/repos/demo/hello/git/trees/")) {
        return json({ truncated: false, tree: Object.entries(FAKE).map(([path, body]) =>
          ({ path, type: "blob", mode: path === "bin/hello" ? "100755" : "100644", size: body.length })) });
      }
      return r.fulfill({ status: 404, headers: cors });
    });
    await page.route(`https://cdn.jsdelivr.net/gh/demo/hello@${SHA}/**`, (r) => {
      const path = decodeURIComponent(new URL(r.request().url()).pathname.split(`@${SHA}/`)[1]);
      return FAKE[path] ? r.fulfill({ body: FAKE[path], headers: cors }) : r.fulfill({ status: 404, headers: cors });
    });
  },
};

const wanted = process.argv.slice(2);
const ALL = [...CATALOG, UNKERNEL_SH];
const entries = wanted.length ? ALL.filter((a) => wanted.includes(a.id)) : ALL;
if (wanted.length && entries.length !== wanted.length) {
  console.error(`Unknown ids: ${wanted.filter((w) => !ALL.some((a) => a.id === w)).join(", ")}`);
  process.exit(2);
}

// The playground echoes each demo's command and tip before running it, so a
// check made of their text would pass before the demo does anything.
const echoes = entries.filter((a) => a.check && a.run && `${a.tip ?? ""} $ ${a.run}`.includes(a.check));
if (echoes.length) {
  for (const a of echoes) console.error(`${a.id}: check ${JSON.stringify(a.check)} is part of its own command or tip; pick text only the demo's output shows`);
  process.exit(2);
}

const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: "127.0.0.1,localhost" } : undefined;
const browser = await chromium.launch({ proxy });

async function run(app) {
  const t0 = Date.now();
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const screen = () => page.evaluate(() =>
    [...document.querySelectorAll(".xterm-rows > div")].map((d) => d.textContent.trimEnd()).join("\n"));
  try {
    await app.routes?.(page);
    await page.goto(base + (app.path ?? `?app=${encodeURIComponent(app.id)}`)); // starts it
    await page.waitForFunction(() => {
      const s = document.querySelector("#status");
      return s.classList.contains("error") || /^Running|exited/.test(s.textContent);
    }, null, { timeout: 180_000 });
    const status = await page.textContent("#status");
    if (!/^Running/.test(status)) throw new Error(`status: ${status}`);
    if (app.check) {
      await page.waitForFunction((want) => [...document.querySelectorAll(".xterm-rows > div")]
        .some((d) => d.textContent.includes(want)), app.check, { timeout: 90_000 })
        .catch(() => { throw new Error(`never showed ${JSON.stringify(app.check)}`); });
    } else {
      await page.waitForTimeout(8000);
    }
    const text = await screen();
    const bad = text.split("\n").find((l) => /not found|ERROR:|Traceback|command not found/.test(l));
    if (bad) throw new Error(`terminal: ${bad.trim()}`);
    if (errors.length) throw new Error(`page error: ${errors[0]}`);
    return { app, ok: true, secs: (Date.now() - t0) / 1000 };
  } catch (err) {
    const text = await screen().catch(() => "");
    return { app, ok: false, secs: (Date.now() - t0) / 1000, why: err.message.split("\n")[0], tail: text.trim().split("\n").slice(-8).join("\n") };
  } finally {
    await page.close();
  }
}

const results = [];
const queue = [...entries];
const workers = Array.from({ length: Math.min(+process.env.CONCURRENCY || 3, queue.length) }, async () => {
  while (queue.length) {
    const r = await run(queue.shift());
    results.push(r);
    console.log(`${r.ok ? "ok  " : "FAIL"} ${r.app.id.padEnd(16)} ${r.secs.toFixed(1).padStart(6)} s${r.ok ? "" : `  ${r.why}`}`);
    if (!r.ok && r.tail) console.log(r.tail.replace(/^/gm, "       | "));
  }
});
await Promise.all(workers);
await browser.close();
server.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length} of ${results.length} passed`);
process.exit(failed.length ? 1 : 0);
