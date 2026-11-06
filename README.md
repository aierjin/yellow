# Yellow

**A QUIET JOURNEY** — 连锁升降棋盘（Chain-lift Puzzle）WebGL 益智小游戏。

在高低错落的石柱之间，把一条相连的路铺向星空。轻触一根石柱，它和四邻会一起升降；在限定步数内连通起点与终点，找出最少步数的最优路线。

## Play

在线游玩（GitHub Pages，无限制、免费）：

👉 **https://aierjin.github.io/yellow/**

## Run locally

The game is a pure static site. It can be served by any static file server — for example:

```bash
node server.cjs
```

Then open `http://localhost:8816`.

> Note: because the app loads ES modules via `<script type="module">`, opening `index.html` directly with the `file://` protocol will be blocked by the browser. Use the local server above instead.

A self-contained Windows runtime (`runtime/`) is included for offline play — just double-click `启动游戏.cmd`.

## Features

- **60 levels** across 5 chapters, each with a guaranteed optimal-move solution.
- **Interactive tutorial** on the first level; contextual help cards from level 2 onward.
- **Star progress** saved in the browser, keyed by origin; a hidden finale unlocks past 280 stars.
- Full 3D scene, character animation and a complete ending music track.

## Tech stack

- Vanilla JavaScript (ES modules) — no build step, no framework.
- [Three.js](https://threejs.org/) (bundled in `vendor/`) for WebGL rendering.
- A small exact-search solver (`src/solver.mjs`, `src/exact-search.mjs`) verifies the optimal-move count for every level.

## Project structure

```
index.html        entry page
style.css         styling
src/              game logic (engine, solver, chapters, characters, scenes)
assets/           textures, sprite sheets and audio
vendor/           Three.js and its license
tests/            Node logic tests (77/77 passing)
runtime/          self-contained Windows Node runtime (local play only)
server.cjs        minimal static file server
```

## Testing

```bash
node --test tests/
```

Or double-click `运行检查.cmd` on Windows. All 77 logic tests pass, covering level solvability, routes, step counts, star counts, camera and character movement rules.

## License

MIT. Three.js is distributed under its own license — see `vendor/LICENSE-three.txt`.
