# Changelog

Each version is a single commit on the branch, and its commit message starts with
`wyeast vX.Y`. To see them all:

```sh
git log --oneline --grep "wyeast v"
```

**Compare two versions:** `git diff <old-commit> <new-commit> -- wyeastclimbers`

**Roll the site back to a version** (this touches only this folder, and you can still undo it):

```sh
git checkout <commit> -- wyeastclimbers
git commit -m "Roll wyeastclimbers back to vX.Y"
```

**Preview an old version without changing anything:**

```sh
git worktree add /tmp/wyeast-old <commit>
cd /tmp/wyeast-old/wyeastclimbers && npm install && npm run dev
```

---

## v0.3: Search & dark-mode toggle
- **Site search** at /search, powered by [Pagefind](https://pagefind.app). The index is built after `astro build` (`npm run build` now runs both). Results link straight to sections within exhibits and timeline entries. Links like `/search?q=Leuthold` work too.
- **Light/dark toggle** in the header. Your choice is remembered; without one, the site follows the device setting.
- Status badges and photo placeholders are left out of search excerpts.
- Text pages (About, Sources, profiles) now line up with the rest of the site instead of being centered.

## v0.2: Route map
- New **/map** page: a schematic plan view of Mount Hood with the club's first ascents (solid lines), reopened routes (dashed) and the South Side for reference (dotted). Hovering or tapping a route highlights it, and each route links to its timeline entry.
- The same map now opens the *New Lines on Wy'east* exhibit, turned on with `feature: route-map` in the exhibit's frontmatter.
- Route data lives in `src/data/routes.ts`. Bearings are approximate.

## v0.1: Starter site (commit `d2fb766`, "feat: Add wyeastclimbers.com starter site")
- Timeline (27 entries with sources and status badges), 5 exhibits, 14 people profiles, sources page, About & Contribute.
- GitHub Pages workflow and `CNAME`.
