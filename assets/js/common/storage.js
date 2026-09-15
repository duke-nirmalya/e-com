/* =====================================================
   SHARED: localStorage helpers
   Owner: shared infrastructure (do not duplicate this logic
   in your own page scripts — import/use these functions).

   Why an "overlay" pattern?
   Our product/category data lives in read-only .json files
   (fetch() can only GET them, it can't write back to disk).
   To let the Admin portal "create / edit / delete" products
   and have those changes show up on the Shop page too, we
   store the *changes* in localStorage and merge them with
   the original JSON at read time. This mimics how a real
   frontend merges a server response with local optimistic
   state — just without a real backend.
===================================================== */

const Storage = {

    get(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (err) {
            console.error(`Storage.get failed for "${key}"`, err);
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error(`Storage.set failed for "${key}"`, err);
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    }

};


/* =====================================================
   OVERLAY: tracks created / edited / deleted records
   per resource ("products", "orders", ...) on top of the
   base JSON file, so admin CRUD survives a page refresh.

   Shape saved under `novae_overlay_<resource>`:
   {
       created: [ {...record}, ... ],
       updated: { [id]: {...partialRecord} },
       deletedIds: [ id, id, ... ]
   }
===================================================== */

const Overlay = {

    key(resource) {
        return `novae_overlay_${resource}`;
    },

    read(resource) {
        return Storage.get(this.key(resource), {
            created: [],
            updated: {},
            deletedIds: []
        });
    },

    write(resource, overlay) {
        Storage.set(this.key(resource), overlay);
    },

    /** Merge base records (from JSON) with the saved overlay. */
    apply(resource, baseRecords) {
        const overlay = this.read(resource);

        const merged = baseRecords
            .filter(record => !overlay.deletedIds.includes(record.id))
            .map(record =>
                overlay.updated[record.id]
                    ? { ...record, ...overlay.updated[record.id] }
                    : record
            );

        return [...merged, ...overlay.created];
    },

    create(resource, record) {
        const overlay = this.read(resource);
        overlay.created.push(record);
        this.write(resource, overlay);
    },

    update(resource, id, changes) {
        const overlay = this.read(resource);

        // If it's a record the admin created locally, patch it in place.
        const createdIndex = overlay.created.findIndex(item => item.id === id);
        if (createdIndex !== -1) {
            overlay.created[createdIndex] = { ...overlay.created[createdIndex], ...changes };
        } else {
            overlay.updated[id] = { ...overlay.updated[id], ...changes };
        }

        this.write(resource, overlay);
    },

    remove(resource, id) {
        const overlay = this.read(resource);
        overlay.created = overlay.created.filter(item => item.id !== id);
        delete overlay.updated[id];
        if (!overlay.deletedIds.includes(id)) overlay.deletedIds.push(id);
        this.write(resource, overlay);
    }

};
