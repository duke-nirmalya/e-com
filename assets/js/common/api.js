/* =====================================================
   SHARED: data access layer
   Owner: shared infrastructure — extend it, don't fork it.

   This is the ONLY file that should call fetch() directly.
   Every page script talks to data through the objects below
   (ProductsAPI, CategoriesAPI, CouponsAPI, AuthAPI) so the
   rest of the app doesn't care whether data comes from a
   .json file, localStorage, or (later) a real backend.

   TEAM NOTE: the functions marked with a "TODO(you)" comment
   are intentionally left for you to finish. Everything else
   (getAll for products/categories, the overlay merge) is
   provided as a worked example of the two styles you'll be
   asked to use elsewhere: raw Promises (.then/.catch) and
   async/await.
===================================================== */

const DATA_BASE = "/data";


/**
 * Generic GET-JSON helper, written with raw Promises.
 * Every other function in this file is free to build on top
 * of this instead of calling fetch() again.
 */
function getJSON(path) {
    return fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error(`getJSON(${path}) failed:`, error);
            throw error; // let the caller decide how to show this to the user
        });
}


/* =====================================================
   PRODUCTS
===================================================== */

const ProductsAPI = {

    /**
     * Fetch the base product list and merge it with any
     * admin created/edited/deleted changes stored locally.
     * Written with async/await as the second worked example.
     */
    async getAll() {
        const baseProducts = await getJSON(`${DATA_BASE}/products.json`);
        return Overlay.apply("products", baseProducts);
    },

    async getById(id) {
        const all = await this.getAll();
        return all.find(product => product.id === id) || null;
    },

    // TODO(you — Student D, Admin): implement create.
    // 1. Build a new product object (generate an id — e.g. Date.now()).
    // 2. Save it with Overlay.create("products", newProduct).
    // 3. Return the created product.
    async create(productData) {
        throw new Error("ProductsAPI.create() is not implemented yet");
    },

    // TODO(you — Student D, Admin): implement update.
    // Use Overlay.update("products", id, changes).
    async update(id, changes) {
        throw new Error("ProductsAPI.update() is not implemented yet");
    },

    // TODO(you — Student D, Admin): implement remove.
    // Use Overlay.remove("products", id).
    async remove(id) {
        throw new Error("ProductsAPI.remove() is not implemented yet");
    }

};


/* =====================================================
   CATEGORIES
===================================================== */

const CategoriesAPI = {

    getAll() {
        return getJSON(`${DATA_BASE}/categories.json`);
    }

};


/* =====================================================
   COUPONS
===================================================== */

const CouponsAPI = {

    // TODO(you — Student C, Cart): implement this using
    // either .then()/.catch() or async/await — your choice.
    // It should fetch coupons.json and return the matching
    // coupon object (case-insensitive code match, active only)
    // or null if no match is found.
    async findByCode(code) {
        throw new Error("CouponsAPI.findByCode() is not implemented yet");
    }

};


/* =====================================================
   AUTH (admin login)
===================================================== */

const AuthAPI = {

    // TODO(you — Student D, Admin): implement login.
    // 1. Fetch data/users.json
    // 2. Find a user whose username + password match.
    // 3. On success, store the logged-in user with
    //    Storage.set("novae_admin_session", user) and resolve with
    //    the user (this key must match getSession()/logout() below).
    // 4. On failure, reject/throw with a clear error message.
    async login(username, password) {
        throw new Error("AuthAPI.login() is not implemented yet");
    },

    logout() {
        Storage.remove("novae_admin_session");
    },

    getSession() {
        return Storage.get("novae_admin_session", null);
    }

};
