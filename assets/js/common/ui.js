/* =====================================================
   SHARED: small UI utilities used on every page
   Owner: shared infrastructure.

   Cart/wishlist arrays themselves are owned by Student C
   (see assets/js/cart.js) but the badge counters in the
   navbar appear on every page, so the read + render helper
   lives here.
===================================================== */

function money(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value);
}


function getCart() {
    return Storage.get("novae_cart", []);
}


function getWishlist() {
    return Storage.get("novae_wishlist", []);
}


function refreshNavBadges() {
    const cart = getCart();
    const wishlist = getWishlist();

    const cartCountEl = document.getElementById("cartCount");
    const wishlistCountEl = document.getElementById("wishlistCount");

    if (cartCountEl) {
        cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (wishlistCountEl) {
        wishlistCountEl.textContent = wishlist.length;
    }
}


function showToast(message) {
    const toastText = document.getElementById("toastText");
    const toastEl = document.getElementById("toast");

    if (!toastEl || !toastText) {
        console.log("[toast]", message);
        return;
    }

    toastText.textContent = message;

    const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
    toast.show();
}


/* =====================================================
   PARTIALS: fetch shared header/footer HTML into every page
===================================================== */

function loadPartial(url, targetId) {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load partial: ${url}`);
            return response.text();
        })
        .then(html => {
            document.getElementById(targetId).innerHTML = html;
        })
        .catch(error => console.error(error));
}


/** Call once per page, after the DOM is ready, before your page script runs. */
async function initLayout() {
    await Promise.all([
        loadPartial("partials/header.html", "site-header"),
        loadPartial("partials/footer.html", "site-footer")
    ]);

    refreshNavBadges();
    bindGenericLayoutEvents();
}


/** Boilerplate UI toggles that are the same on every page (search panel, theme, back-to-top). */
function bindGenericLayoutEvents() {
    const searchPanel = document.getElementById("searchPanel");
    const searchButton = document.getElementById("searchButton");
    const closeSearch = document.getElementById("closeSearch");

    if (searchButton) {
        searchButton.addEventListener("click", () => {
            searchPanel.classList.add("open");
            document.getElementById("searchInput").focus();
        });
    }

    if (closeSearch) {
        closeSearch.addEventListener("click", () => {
            searchPanel.classList.remove("open");
        });
    }

    const themeButton = document.getElementById("themeButton");
    if (themeButton) {
        themeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            const icon = themeButton.querySelector("i");
            icon.className = document.body.classList.contains("dark") ? "bi bi-sun" : "bi bi-moon";
        });
    }

    const backTop = document.getElementById("backTop");
    if (backTop) {
        window.addEventListener("scroll", () => {
            backTop.classList.toggle("show", window.scrollY > 500);
        });
        backTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}
