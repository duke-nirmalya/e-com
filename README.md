# NOVAÉ — Team E-Commerce Project

A multi-page e-commerce site (originally a single-page demo, now split
page-by-page and section-by-section) used as a team practice project.
The goal: practice **fetch API, Promises, async/await, and working as a
4-person team on one codebase**, with a small **Admin portal** for
Create/Edit/Delete on the product catalog.

The original single-page version is kept, unmodified, in [`legacy/`](legacy/)
as a design + behavior reference. Don't edit it — copy patterns out of it
into the new page-specific files instead.

## Running the project

Fetch requests to local `.json` files and HTML partials will **fail if you
just double-click `index.html`** (the `file://` protocol blocks them). You
must serve the folder over HTTP. Any of these work:

```bash
# Option 1 — Node (no install needed)
npx serve .

# Option 2 — Python
python3 -m http.server 5500

# Option 3 — VS Code "Live Server" extension
# Right-click index.html → "Open with Live Server"
```

Then open the printed `localhost` URL. Do this for every page you test,
including everything under `admin/`.

## Project structure

```
index.html          Home page (hero, collections, story, newsletter)
shop.html            Product listing (filter, sort, search, quick view)
product.html         Single product detail page (?id=<id>)
cart.html            Full cart / checkout page
admin/               Admin portal (login, dashboard, products CRUD, orders)

data/                "Backend" — static JSON files, fetched read-only
  products.json
  categories.json
  coupons.json
  users.json         Admin login credentials (demo: admin / admin123)

partials/            Shared HTML fetched into every storefront page
  header.html         topbar + navbar + search panel
  footer.html         footer + cart drawer + quick-view modal + toast

assets/
  css/
    style.css         Shared storefront styles (from the legacy design)
    admin.css          Admin portal styles
  js/
    common/
      storage.js        localStorage + "overlay" helpers (shared, provided)
      api.js             fetch layer: ProductsAPI, CategoriesAPI, CouponsAPI, AuthAPI
      ui.js              partial loader, navbar badges, toast, generic UI events
    home.js             Home page logic
    shop.js             Shop page logic
    product.js          Product detail page logic
    cart.js             Cart / wishlist / checkout logic
    admin/
      admin-auth.js
      admin-dashboard.js
      admin-products.js

legacy/              Original single-page version — reference only, don't edit
```

## Why there's no real backend

We don't have a database or server. Instead:

- **Reads** go straight to the `.json` files in `data/` via `fetch()`.
- **Writes** (admin create/edit/delete, cart, wishlist, orders) are
  simulated with `localStorage`, then merged on top of the JSON data
  at read time. This "overlay" pattern lives in
  [`assets/js/common/storage.js`](assets/js/common/storage.js) and is
  already implemented for you — study it, don't reinvent it.

This means every "CRUD" operation still has to go through an
async-looking API (`ProductsAPI.create()`, etc., in `assets/js/common/api.js`)
exactly like it would against a real server — you're practicing the same
`async/await` + error-handling patterns you'd use against a real REST API.

## Team split (4 students, by page)

| Student | Owns | Files |
|---|---|---|
| **A — Home** | Hero, Collections grid, Story, Newsletter | `index.html`, `assets/js/home.js` |
| **B — Shop** | Product listing, filter/sort/search, quick view, product detail page | `shop.html`, `product.html`, `assets/js/shop.js`, `assets/js/product.js` |
| **C — Cart** | Cart drawer, wishlist, coupons, checkout | `cart.html`, `assets/js/cart.js` |
| **D — Admin** | Login, dashboard, products CRUD, orders list | everything in `admin/` |

Shared, already-implemented infrastructure that **everyone reads but
nobody forks**: `assets/js/common/*.js`, `partials/*.html`,
`assets/css/style.css`. If you need to change shared code, say so in
the team channel first — it affects everyone.

Every file above has `TODO(you — Student X)` comments marking exactly
what's left to build, with the specific method signatures expected
(so your teammates' code that calls your functions keeps working).

## Suggested git workflow

1. One branch per student: `feature/home`, `feature/shop`, `feature/cart`, `feature/admin`.
2. Small, frequent commits with clear messages — not one giant commit at the end.
3. Open a Pull Request into `main` when a feature works; at least one
   other student reviews it before merge (yes, review each other's code —
   that's the point).
4. Because you each mostly own separate files, merge conflicts should
   be rare. If two of you need to touch `assets/js/common/`, coordinate
   before you start, not after you both finish.
5. Agree on one naming/formatting convention as a team before writing
   code (e.g. always `camelCase`, always `async/await` over `.then()`
   unless there's a reason not to) and stick to it — consistency across
   a shared codebase is a real production skill.

## What you're practicing

- **fetch()** for reading JSON and HTML partials.
- **Promises** (`.then/.catch`) — see `getJSON()` in `api.js` for a
  worked example.
- **async/await** — see `ProductsAPI.getAll()` in `api.js` for a worked
  example, then use the same style in your own TODOs.
- **Error handling** — every fetch can fail (typo in a filename, no
  local server running, etc.). Your UI should never just go blank;
  show the user something.
- **State that survives a refresh** — via `localStorage`, without a
  real backend.
- **Working in parallel on one codebase** — clear file ownership, PRs,
  and code review, like a real team.
