// "From repo to running": an isometric scene of the four steps behind every
// tile (clone, install, catalog, run), driven by the step list beside it.
// Starts on the finished scene (so a still frame shows everything), plays
// from step 1 once scrolled into view, and never auto-plays for people who
// prefer reduced motion.

const NS = "http://www.w3.org/2000/svg";
const C = Math.cos(Math.PI / 6), S = 0.5;
const P = (x, y, z) => [(x - y) * C, (x + y) * S - z];
const pts = (...ps) => ps.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
const el = (name, attrs = {}, parent) => {
  const e = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  parent?.append(e);
  return e;
};

// A slab w×d×t drawn with its back-left-bottom corner at the group's origin.
function slab(parent, { w, d, t, kind, label, side, size = 9 }) {
  const g = el("g", { class: `slab ${kind}` }, parent);
  el("polygon", { class: "l", points: pts(P(0, d, t), P(w, d, t), P(w, d, 0), P(0, d, 0)) }, g);
  el("polygon", { class: "r", points: pts(P(w, 0, t), P(w, d, t), P(w, d, 0), P(w, 0, 0)) }, g);
  el("polygon", { class: "t", points: pts(P(0, 0, t), P(w, 0, t), P(w, d, t), P(0, d, t)) }, g);
  if (label) { // lying on the top face, running along x
    const [cx, cy] = P(w / 2, d / 2, t);
    const tx = el("text", { transform: `matrix(${C} ${S} ${-C} ${S} ${cx} ${cy})`, "font-size": size }, g);
    tx.textContent = label;
  }
  if (side) { // printed on the front-left face
    const [sx, sy] = P(w / 2, d, t / 2);
    const tx = el("text", { class: "side", transform: `matrix(${C} ${S} 0 1 ${sx} ${sy})`, "font-size": size }, g);
    tx.textContent = side;
  }
  return g;
}

export function mountPipeline(root, { tools = 23 } = {}) {
  const svg = root.querySelector("svg.iso");
  const steps = [...root.querySelectorAll(".step")];
  const screen = root.querySelector(".mini pre");
  const world = el("g", {}, svg);

  // Every moving part: where it sits (x, y, z) and whether it shows, per step 1-4.
  const parts = [];
  const add = (g, at, delay = 0) => { g.style.setProperty("--delay", `${delay}ms`); parts.push({ g, at }); return g; };
  const place = (x, y, z, o = 1) => ({ x, y, z, o });

  // Sources, with the connector lines that light up while they deliver.
  const gh = add(slab(world, { w: 96, d: 34, t: 6, kind: "src", label: "github.com" }), () => place(-250, 20, 150));
  const pk = add(slab(world, { w: 96, d: 34, t: 6, kind: "src", label: "pkgs.local" }), () => place(40, -240, 150));
  gh.dataset.active = "1"; pk.dataset.active = "2";
  const wire = (from, to, step) => {
    const line = el("line", { class: "wire", x1: from[0], y1: from[1], x2: to[0], y2: to[1] }, world);
    line.dataset.step = step;
  };

  // The machine: an open cardboard box, with a strip of tape.
  add(slab(world, { w: 260, d: 260, t: 30, kind: "box", side: "alpine 3.24 · aarch64", size: 11 }), () => place(-130, -130, 0));
  const tape = el("polygon", { class: "tape", points: pts(P(-22, -130, 30.5), P(22, -130, 30.5), P(22, 130, 30.5), P(-22, 130, 30.5)) }, world);

  // 1 · Clone: the repo lands in ~/ripgrep, files and all.
  add(slab(world, { w: 124, d: 112, t: 14, kind: "plate", side: "~/ripgrep", size: 9 }),
    (s) => s >= 1 ? place(-122, -120, 30) : place(-122, -120, 200, 0));
  const files = [["crates/", -114, -112], ["README", -56, -112], [".unkernel.sh", -114, -64], ["Cargo.toml", -56, -64]];
  files.forEach(([name, x, y], i) => add(slab(world, { w: 52, d: 40, t: 6, kind: "chip", label: name, size: 8 }),
    (s) => s >= 1 ? place(x, y, 44) : place(x, y, 260, 0), 250 + i * 110));

  // 2 · Install: signed packages stack up on the other side of the box.
  const pkgs = ["libgcc", "pcre2", "ripgrep"];
  pkgs.forEach((name, i) => add(slab(world, { w: 76, d: 40, t: 9, kind: "pkg", label: `${name}.apk`, size: 8 }),
    (s) => s >= 2 ? place(22, 18, 30 + i * 9) : place(210, 18, 30 + i * 9 + 40, 0), i * 160));

  // 3 · Catalog: the shelf assembles above the box. 4 · Run: one tile lifts.
  const tiles = [["fzf", -85, -55], ["jq", -25, -55], ["nvim", 35, -55], ["htop", -85, 5], ["bat", -25, 5], ["rg", 35, 5]];
  tiles.sort((a, b) => (a[1] + a[2]) - (b[1] + b[2])).forEach(([name, x, y], i) => {
    const hot = name === "rg";
    const g = add(slab(world, { w: 50, d: 50, t: 10, kind: `tile${hot ? " hot" : ""}`, label: name, size: 11 }), (s) => {
      if (s < 3) return place(x, y, 230, 0);
      if (s === 4) return hot ? place(x, y, 165) : place(x, y, 112, 0.1);
      return place(x, y, 112);
    }, i * 90);
    if (hot) g.dataset.hot = "1";
  });
  const outs = ["18 matches", "140 files"];
  outs.forEach((name, i) => add(slab(world, { w: 74, d: 24, t: 5, kind: "out", label: name, size: 8 }),
    (s) => s === 4 ? place(i ? -30 : 70, i ? 95 : -50, 205) : place(35, 5, 170, 0), 500 + i * 180));

  // Wires, in screen space, from each source to where its things land.
  const mid = (x, y, z) => P(x, y, z);
  wire(mid(-202, 37, 156), mid(-60, -64, 44), 1);
  wire(mid(88, -223, 156), mid(60, 38, 60), 2);
  for (const l of world.querySelectorAll(".wire")) world.prepend(l);

  const lines = {
    1: [["d", "GET api.github.com/repos/BurntSushi/ripgrep"], ["", "140 files from crates/ and README.md"], ["ok", "→ ~/ripgrep, executable bits kept"]],
    2: [["c", "sudo apk add ripgrep"], ["", "(1/3) Installing libgcc (15.2.0-r5)"], ["", "(2/3) Installing pcre2 (10.49-r0)"], ["", "(3/3) Installing ripgrep (15.1.0-r0)"]],
    3: [["d", `catalog.js · ${tools} tools`], ["", "{ id: \"ripgrep\", pkgs: [\"ripgrep\"],"], ["", "  run: \"rg --stats -n 'fn search_' crates\" }"], ["ok", "weekly: boot, install, run, check"]],
    4: [["c", "rg --stats -n 'fn search_' crates"], ["", "crates/core/search.rs:376: fn search_path(…)"], ["ok", "18 matches"], ["ok", "140 files searched"]],
  };

  let stage = 4, timer = 0, typing = 0;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  function show(s, { animate = true } = {}) {
    stage = s;
    root.dataset.stage = s;
    root.classList.toggle("still", !animate);
    for (const { g, at } of parts) {
      const { x, y, z, o } = at(s);
      const [sx, sy] = P(x, y, z);
      g.style.transform = `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px)`;
      g.style.opacity = o;
    }
    for (const src of [gh, pk]) src.classList.toggle("on", +src.dataset.active === s);
    for (const w of world.querySelectorAll(".wire")) w.classList.toggle("on", +w.dataset.step === s);
    steps.forEach((b, i) => {
      b.setAttribute("aria-current", i + 1 === s ? "step" : "false");
      b.classList.toggle("done", i + 1 < s);
    });
    clearTimeout(typing);
    const want = lines[s];
    const draw = (n) => {
      screen.innerHTML = want.slice(0, n).map(([k, t]) =>
        `<span class="${k}">${k === "c" ? "~ ⇒ " : ""}${t.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c])}</span>`).join("\n");
      if (animate && n < want.length) typing = setTimeout(() => draw(n + 1), 380);
    };
    draw(animate ? 1 : want.length);
  }

  const DWELL = 4800;
  function schedule() {
    clearTimeout(timer);
    if (reduced.matches || !inView || document.hidden) return;
    timer = setTimeout(() => { show(stage % 4 + 1); schedule(); }, DWELL);
  }

  let inView = false, started = false;
  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (inView && !started && !reduced.matches) { started = true; show(1); }
    schedule();
  }, { threshold: 0.35 }).observe(root);
  document.addEventListener("visibilitychange", schedule);

  steps.forEach((b, i) => b.addEventListener("click", () => { started = true; show(i + 1, { animate: !reduced.matches }); schedule(); }));

  root.style.setProperty("--dwell", `${DWELL}ms`);
  show(4, { animate: false }); // the finished scene, until it's seen
}
