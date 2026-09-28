// /* =====================================================
//    CART / WISHLIST / CHECKOUT
//    Owner: Student C

//    This file is loaded on EVERY page (not just cart.html)
//    because the cart drawer lives in the shared footer partial
//    and is reachable from every page's navbar. `initCartWidget()`
//    is called once per page after the layout partials load.

//    Cart/wishlist arrays are plain arrays of:
//    { id, name, price, image, quantity }
//    persisted via Storage.get/set under "novae_cart" / "novae_wishlist"
//    (see assets/js/common/ui.js's getCart()/getWishlist() readers).
// ===================================================== */

// let couponApplied = null; // will hold the matched coupon object, or null


// function initCartWidget() {
//     renderCartDrawer();
//     bindCouponButton();
//     bindCheckoutButton();
// }


// /*
//    TODO(you — Student C): implement addToCart(product).
//    - Read the current cart with getCart().
//    - If the product id already exists, increment its quantity.
//    - Otherwise push a new { id, name, price, image, quantity: 1 }.
//    - Save with Storage.set("novae_cart", cart).
//    - Call renderCartDrawer() and refreshNavBadges() to update the UI.
//    - Call showToast(...) to confirm.

//    This function is called from shop.js and product.js — keep the
//    function name and single `product` argument so their code keeps
//    working.
// */
// function addToCart(product) {
//     throw new Error("addToCart() is not implemented yet — see assets/js/cart.js");
// }


// /*
//    TODO(you — Student C): implement changeQuantity(id, amount).
//    - Find the cart item by id, adjust quantity by `amount`.
//    - If quantity drops to 0 or below, remove the item entirely.
//    - Persist + re-render (same pattern as addToCart).
// */
// function changeQuantity(id, amount) {
//     throw new Error("changeQuantity() is not implemented yet — see assets/js/cart.js");
// }


// /*
//    TODO(you — Student C): implement removeFromCart(id) — filters
//    the item out, persists, re-renders, shows a toast.
// */
// function removeFromCart(id) {
//     throw new Error("removeFromCart() is not implemented yet — see assets/js/cart.js");
// }


// /*
//    TODO(you — Student C): implement toggleWishlist(id). Note this
//    is called from product cards built in shop.js/product.js, so it
//    only receives a product id, not the full product object.
//    - Toggle the id in/out of getWishlist().
//    - Persist with Storage.set("novae_wishlist", ...).
//    - Call refreshNavBadges(). Consider re-rendering the current
//      product grid so the heart icon updates (you'll need to
//      coordinate with Student B on how to trigger that).
// */
// function toggleWishlist(id) {
//     throw new Error("toggleWishlist() is not implemented yet — see assets/js/cart.js");
// }


// /*
//    TODO(you — Student C): render the #cartItems list + the
//    subtotal/shipping/discount/total summary fields inside the
//    cart offcanvas (see partials/footer.html for the element ids:
//    #cartItems, #subtotal, #shipping, #discount, #cartTotal).

//    Business rules to implement:
//    - Shipping is ₹99 if subtotal is between ₹1 and ₹1,999, else free.
//    - If couponApplied is set, discount = subtotal * coupon.discountPercent / 100.
//    - Total = subtotal + shipping - discount (never below 0).
// */
// function renderCartDrawer() {
//     const cartItemsEl = document.getElementById("cartItems");
//     if (!cartItemsEl) return;

//     // TODO(you — Student C): replace this placeholder.
//     cartItemsEl.innerHTML = `<p class="text-muted text-center py-4">Cart rendering not implemented yet.</p>`;
// }


// function bindCouponButton() {
//     const button = document.getElementById("couponButton");
//     if (!button) return;

//     button.addEventListener("click", () => {
//         const input = document.getElementById("couponInput");
//         const message = document.getElementById("couponMessage");
//         const code = input.value.trim();

//         // TODO(you — Student C): call CouponsAPI.findByCode(code).
//         // On match: set couponApplied, show a success message, re-render the drawer.
//         // On no match: clear couponApplied, show an error message.
//         message.textContent = "Coupon logic not implemented yet.";
//     });
// }


// function bindCheckoutButton() {
//     const button = document.getElementById("checkoutButton");
//     if (!button) return;

//     button.addEventListener("click", () => {
//         const cart = getCart();

//         if (cart.length === 0) {
//             showToast("Your bag is empty!");
//             return;
//         }

//         // TODO(you — Student C): this is where a real store would
//         // POST an order to a backend. Since we have no backend,
//         // simulate it: save the order into localStorage under
//         // "novae_orders" (an array of { id, items, total, date }),
//         // so the Admin > Orders page (Student D) can list it.
//         // Then clear the cart and show a success toast.
//         showToast("Checkout is not implemented yet.");
//     });
// }
/* =====================================================
   CART / WISHLIST / CHECKOUT
   Owner: Student C
===================================================== */

let couponApplied = null;


/* =====================================================
   INITIALIZE CART WIDGET
===================================================== */

function initCartWidget() {
    renderCartDrawer();
    bindCouponButton();
    bindCheckoutButton();
}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(product) {

    // Get existing cart
    const cart = getCart();

    // Check whether product already exists
    const existingItem = cart.find(function(item) {
        return item.id === product.id;
    });


    if (existingItem) {

        // Product already exists
        existingItem.quantity++;

    } else {

        // Product does not exist
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }


    // Save cart
    Storage.set("novae_cart", cart);


    // Update UI
    renderCartDrawer();
    refreshNavBadges();


    // Show message
    showToast(product.name + " added to cart!");
}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(id, amount) {

    const cart = getCart();


    const item = cart.find(function(item) {
        return item.id === id;
    });


    if (!item) {
        return;
    }


    // Increase or decrease quantity
    item.quantity += amount;


    // Remove when quantity reaches 0
    if (item.quantity <= 0) {

        const updatedCart = cart.filter(function(item) {
            return item.id !== id;
        });

        Storage.set("novae_cart", updatedCart);

    } else {

        Storage.set("novae_cart", cart);

    }


    renderCartDrawer();
    refreshNavBadges();
}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(id) {

    const cart = getCart();


    const updatedCart = cart.filter(function(item) {
        return item.id !== id;
    });


    Storage.set("novae_cart", updatedCart);


    renderCartDrawer();
    refreshNavBadges();


    showToast("Item removed from cart.");
}


/* =====================================================
   TOGGLE WISHLIST
===================================================== */

function toggleWishlist(id) {

    const wishlist = getWishlist();


    const index = wishlist.indexOf(id);


    if (index === -1) {

        // Add product ID
        wishlist.push(id);

        showToast("Added to wishlist ❤️");

    } else {

        // Remove product ID
        wishlist.splice(index, 1);

        showToast("Removed from wishlist.");

    }


    Storage.set("novae_wishlist", wishlist);


    refreshNavBadges();


    /*
       Refresh product cards if shop.js provides
       a rendering function.
    */

    if (typeof renderProducts === "function") {
        renderProducts();
    }

}


/* =====================================================
   RENDER CART DRAWER
===================================================== */

function renderCartDrawer() {

    const cartItemsEl =
        document.getElementById("cartItems");


    if (!cartItemsEl) {
        return;
    }


    const cart = getCart();


    /* ---------------------------------------------
       Empty Cart
    --------------------------------------------- */

    if (cart.length === 0) {

        cartItemsEl.innerHTML = `
            <div class="text-center py-5">

                <div class="fs-1 mb-3">
                    🛒
                </div>

                <p class="text-muted">
                    Your bag is empty.
                </p>

            </div>
        `;

        updateCartSummary(0);

        return;
    }


    /* ---------------------------------------------
       Render Cart Items
    --------------------------------------------- */

    cartItemsEl.innerHTML = cart.map(function(item) {

        return `

            <div class="cart-item d-flex gap-3 mb-3">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-item-image"
                >

                <div class="flex-grow-1">

                    <h6 class="mb-1">
                        ${item.name}
                    </h6>

                    <p class="mb-2">
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>


                    <div class="d-flex align-items-center gap-2">

                        <button
                            class="btn btn-sm btn-outline-secondary"
                            onclick="changeQuantity(${item.id}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="btn btn-sm btn-outline-secondary"
                            onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                        <button
                            class="btn btn-sm btn-outline-danger ms-2"
                            onclick="removeFromCart(${item.id})">
                            Remove
                        </button>

                    </div>

                </div>

            </div>

        `;

    }).join("");


    /* ---------------------------------------------
       Calculate Subtotal
    --------------------------------------------- */

    let subtotal = 0;


    cart.forEach(function(item) {

        subtotal += item.price * item.quantity;

    });


    updateCartSummary(subtotal);
}


/* =====================================================
   CART SUMMARY
===================================================== */

function updateCartSummary(subtotal) {

    const subtotalEl =
        document.getElementById("subtotal");

    const shippingEl =
        document.getElementById("shipping");

    const discountEl =
        document.getElementById("discount");

    const totalEl =
        document.getElementById("cartTotal");


    /* ---------------------------------------------
       Shipping
    --------------------------------------------- */

    let shipping = 0;


    if (subtotal > 0 && subtotal < 1999) {

        shipping = 99;

    }


    /* ---------------------------------------------
       Discount
    --------------------------------------------- */

    let discount = 0;


    if (couponApplied) {

        discount =
            subtotal *
            couponApplied.discountPercent /
            100;

    }


    /* ---------------------------------------------
       Total
    --------------------------------------------- */

    let total =
        subtotal +
        shipping -
        discount;


    if (total < 0) {
        total = 0;
    }


    /* ---------------------------------------------
       Display
    --------------------------------------------- */

    if (subtotalEl) {
        subtotalEl.textContent =
            "₹" + subtotal.toLocaleString("en-IN");
    }


    if (shippingEl) {

        shippingEl.textContent =
            shipping === 0
                ? "FREE"
                : "₹" + shipping.toLocaleString("en-IN");

    }


    if (discountEl) {

        discountEl.textContent =
            "-₹" + discount.toLocaleString("en-IN");

    }


    if (totalEl) {

        totalEl.textContent =
            "₹" + total.toLocaleString("en-IN");

    }
}


/* =====================================================
   COUPON
===================================================== */

function bindCouponButton() {

    const button =
        document.getElementById("couponButton");


    if (!button) {
        return;
    }


    button.addEventListener("click", async function() {

        const input =
            document.getElementById("couponInput");

        const message =
            document.getElementById("couponMessage");


        const code =
            input.value.trim();


        if (!code) {

            couponApplied = null;

            message.textContent =
                "Please enter a coupon code.";

            message.className =
                "text-danger";

            renderCartDrawer();

            return;
        }


        try {

            const coupon =
                await CouponsAPI.findByCode(code);


            if (coupon) {

                couponApplied = coupon;


                message.textContent =
                    "Coupon applied successfully!";


                message.className =
                    "text-success";


                renderCartDrawer();

            } else {

                couponApplied = null;


                message.textContent =
                    "Invalid coupon code.";


                message.className =
                    "text-danger";


                renderCartDrawer();

            }

        } catch (error) {

            couponApplied = null;


            message.textContent =
                "Unable to apply coupon.";


            message.className =
                "text-danger";

        }

    });
}


/* =====================================================
   CHECKOUT
===================================================== */

function bindCheckoutButton() {

    const button =
        document.getElementById("checkoutButton");


    if (!button) {
        return;
    }


    button.addEventListener("click", function() {

        const cart = getCart();


        if (cart.length === 0) {

            showToast("Your bag is empty!");

            return;
        }


        /* -----------------------------------------
           Calculate total
        ----------------------------------------- */

        let subtotal = 0;


        cart.forEach(function(item) {

            subtotal +=
                item.price * item.quantity;

        });


        let shipping = 0;


        if (subtotal > 0 && subtotal < 1999) {

            shipping = 99;

        }


        let discount = 0;


        if (couponApplied) {

            discount =
                subtotal *
                couponApplied.discountPercent /
                100;

        }


        let total =
            subtotal +
            shipping -
            discount;


        if (total < 0) {
            total = 0;
        }


        /* -----------------------------------------
           Create Order
        ----------------------------------------- */

        const orders =
            JSON.parse(
                localStorage.getItem("novae_orders")
            ) || [];


        const order = {

            id:
                "ORD-" +
                Date.now(),

            items: cart,

            total: total,

            date:
                new Date().toISOString()

        };


        orders.push(order);


        localStorage.setItem(
            "novae_orders",
            JSON.stringify(orders)
        );


        /* -----------------------------------------
           Clear Cart
        ----------------------------------------- */

        Storage.set(
            "novae_cart",
            []
        );


        couponApplied = null;


        renderCartDrawer();

        refreshNavBadges();


        showToast(
            "Order placed successfully! 🎉"
        );

    });
}

