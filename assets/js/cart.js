/* =====================================================
   CART / WISHLIST / CHECKOUT
   Owner: Student C

   This file is loaded on EVERY page (not just cart.html)
   because the cart drawer lives in the shared footer partial
   and is reachable from every page's navbar. `initCartWidget()`
   is called once per page after the layout partials load.

   Cart/wishlist arrays are plain arrays of:
   { id, name, price, image, quantity }
   persisted via Storage.get/set under "novae_cart" / "novae_wishlist"
   (see assets/js/common/ui.js's getCart()/getWishlist() readers).
===================================================== */

let couponApplied = null; // will hold the matched coupon object, or null


function initCartWidget() {
    renderCartDrawer();
    bindCouponButton();
    bindCheckoutButton();
}


/*
   TODO(you — Student C): implement addToCart(product).
   - Read the current cart with getCart().
   - If the product id already exists, increment its quantity.
   - Otherwise push a new { id, name, price, image, quantity: 1 }.
   - Save with Storage.set("novae_cart", cart).
   - Call renderCartDrawer() and refreshNavBadges() to update the UI.
   - Call showToast(...) to confirm.

   This function is called from shop.js and product.js — keep the
   function name and single `product` argument so their code keeps
   working.
*/
function addToCart(product) {
    throw new Error("addToCart() is not implemented yet — see assets/js/cart.js");
}


/*
   TODO(you — Student C): implement changeQuantity(id, amount).
   - Find the cart item by id, adjust quantity by `amount`.
   - If quantity drops to 0 or below, remove the item entirely.
   - Persist + re-render (same pattern as addToCart).
*/
function changeQuantity(id, amount) {
    throw new Error("changeQuantity() is not implemented yet — see assets/js/cart.js");
}


/*
   TODO(you — Student C): implement removeFromCart(id) — filters
   the item out, persists, re-renders, shows a toast.
*/
function removeFromCart(id) {
    throw new Error("removeFromCart() is not implemented yet — see assets/js/cart.js");
}


/*
   TODO(you — Student C): implement toggleWishlist(id). Note this
   is called from product cards built in shop.js/product.js, so it
   only receives a product id, not the full product object.
   - Toggle the id in/out of getWishlist().
   - Persist with Storage.set("novae_wishlist", ...).
   - Call refreshNavBadges(). Consider re-rendering the current
     product grid so the heart icon updates (you'll need to
     coordinate with Student B on how to trigger that).
*/
function toggleWishlist(id) {
    throw new Error("toggleWishlist() is not implemented yet — see assets/js/cart.js");
}


/*
   TODO(you — Student C): render the #cartItems list + the
   subtotal/shipping/discount/total summary fields inside the
   cart offcanvas (see partials/footer.html for the element ids:
   #cartItems, #subtotal, #shipping, #discount, #cartTotal).

   Business rules to implement:
   - Shipping is ₹99 if subtotal is between ₹1 and ₹1,999, else free.
   - If couponApplied is set, discount = subtotal * coupon.discountPercent / 100.
   - Total = subtotal + shipping - discount (never below 0).
*/
function renderCartDrawer() {
    const cartItemsEl = document.getElementById("cartItems");
    if (!cartItemsEl) return;

    // TODO(you — Student C): replace this placeholder.
    cartItemsEl.innerHTML = `<p class="text-muted text-center py-4">Cart rendering not implemented yet.</p>`;
}


function bindCouponButton() {
    const button = document.getElementById("couponButton");
    if (!button) return;

    button.addEventListener("click", () => {
        const input = document.getElementById("couponInput");
        const message = document.getElementById("couponMessage");
        const code = input.value.trim();

        // TODO(you — Student C): call CouponsAPI.findByCode(code).
        // On match: set couponApplied, show a success message, re-render the drawer.
        // On no match: clear couponApplied, show an error message.
        message.textContent = "Coupon logic not implemented yet.";
    });
}


function bindCheckoutButton() {
    const button = document.getElementById("checkoutButton");
    if (!button) return;

    button.addEventListener("click", () => {
        const cart = getCart();

        if (cart.length === 0) {
            showToast("Your bag is empty!");
            return;
        }

        // TODO(you — Student C): this is where a real store would
        // POST an order to a backend. Since we have no backend,
        // simulate it: save the order into localStorage under
        // "novae_orders" (an array of { id, items, total, date }),
        // so the Admin > Orders page (Student D) can list it.
        // Then clear the cart and show a success toast.
        showToast("Checkout is not implemented yet.");
    });
}
