# Unboxed

The pages live in `public/unboxed/`: the landing page (`index.html`,
`pipeline.js`), the playground (`play/`), and what both share (`unboxed.css`,
`theme.js`). Everything runs in the visitor's browser on
[unkernel](https://github.com/pithings/unkernel); there is no server.

## Local setup

The Alpine image and the package mirror are pinned in `assets.lock`, not kept
in git. Fetch them once (about 58 MB):

```sh
scripts/unboxed/fetch.sh
npm run dev        # then open /unboxed/
```

## Add a tool to the shelf

1. Check Alpine packages it for aarch64 (`resolve.py` prints its dependencies).
2. Add the package to `packages.txt` and run `build-apk.sh`.
3. Add an entry to `public/unboxed/play/catalog.js`: `pkgs`, a `run` demo, a
   `tip`, and a `check` (text the terminal shows once the demo works). For a
   demo that needs repo files, add `files` with the repo, a pinned commit
   (`git ls-remote https://github.com/OWNER/REPO HEAD`) and only the `paths` it
   needs. Fewer files start faster.
4. Run `node scripts/unboxed/smoke.mjs <id>` until it passes.

## Tests

`node scripts/unboxed/smoke.mjs [id...]` serves `public/`, boots each entry in
headless Chromium, and waits for its `check`. It needs Playwright
(`npm i --no-save playwright && npx playwright install chromium`).

## Update cadence

| When | What | How |
| --- | --- | --- |
| Weekly | Rebuild the mirror from Alpine's stable branch, boot every tool, publish a tested snapshot | Automatic: the "Unboxed refresh" workflow opens a pull request when packages changed, and fails (GitHub emails you) when a tool breaks |
| Monthly | Add 2 to 4 tools; bump the pinned repo commits in `catalog.js` | By hand, about an hour |
| When needed | Upgrade unkernel: `UNKERNEL_RELEASE` and `IMAGE_SHA256` in `assets.lock`, `UNKERNEL` in `play/index.html`, and `installed.txt` (`apk info` in the new image) together | By hand; the kernel and image must come from the same release |
| About every 6 months | Move to Alpine's next release, once unkernel ships an image for it (`ALPINE` in `build-apk.sh`) | By hand, with a full smoke test |

The refresh workflow needs Settings > Actions > General > "Allow GitHub Actions
to create and approve pull requests". Until its first run pins a snapshot,
deploys build the mirror fresh from Alpine.
