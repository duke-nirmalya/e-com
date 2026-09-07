/* =====================================================
   PRODUCT DATABASE
===================================================== */

const products = [

    {
        id: 1,
        name: "Sage Relaxed Shirt",
        category: "women",
        categoryName: "Women",
        price: 2499,
        rating: 4.9,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=90",
        description:
            "A relaxed contemporary shirt crafted for effortless everyday styling."
    },


    {
        id: 2,
        name: "Structured Beige Jacket",
        category: "men",
        categoryName: "Men",
        price: 3999,
        rating: 4.8,
        badge: "TRENDING",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=90",
        description:
            "A structured everyday jacket with a clean modern silhouette."
    },


    {
        id: 3,
        name: "Minimal Leather Bag",
        category: "accessories",
        categoryName: "Accessories",
        price: 1899,
        rating: 4.9,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=90",
        description:
            "Minimal leather-inspired design with enough space for everyday essentials."
    },


    {
        id: 4,
        name: "Ivory Summer Dress",
        category: "women",
        categoryName: "Women",
        price: 2999,
        rating: 4.7,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=90",
        description:
            "A lightweight silhouette designed for warm summer days and evenings."
    },


    {
        id: 5,
        name: "Essential White Tee",
        category: "men",
        categoryName: "Men",
        price: 1199,
        rating: 4.6,
        badge: "ESSENTIAL",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=90",
        description:
            "The everyday essential. Clean, comfortable and endlessly versatile."
    },


    {
        id: 6,
        name: "Classic Black Sunglasses",
        category: "accessories",
        categoryName: "Accessories",
        price: 999,
        rating: 4.8,
        badge: "HOT",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=90",
        description:
            "A timeless frame designed to complete any contemporary look."
    },


    {
        id: 7,
        name: "Oversized Cotton Shirt",
        category: "women",
        categoryName: "Women",
        price: 2199,
        rating: 4.8,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=90",
        description:
            "An oversized cotton silhouette designed for relaxed everyday dressing."
    },


    {
        id: 8,
        name: "Relaxed Black Trousers",
        category: "men",
        categoryName: "Men",
        price: 2699,
        rating: 4.7,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=90",
        description:
            "Relaxed trousers with a refined shape and versatile everyday appeal."
    },


    {
        id: 9,
        name: "Soft Knit Cardigan",
        category: "women",
        categoryName: "Women",
        price: 2899,
        rating: 4.9,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=90",
        description:
            "Soft textured knitwear designed for effortless layering."
    },


    {
        id: 10,
        name: "Classic Denim Jacket",
        category: "men",
        categoryName: "Men",
        price: 3199,
        rating: 4.8,
        badge: "ICON",
        image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=900&q=90",
        description:
            "A modern denim classic built to become a long-term wardrobe staple."
    },


    {
        id: 11,
        name: "Everyday Watch",
        category: "accessories",
        categoryName: "Accessories",
        price: 2299,
        rating: 4.7,
        badge: "LIMITED",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=90",
        description:
            "Minimal watch design with a sophisticated everyday character."
    },


    {
        id: 12,
        name: "Canvas Shoulder Bag",
        category: "accessories",
        categoryName: "Accessories",
        price: 1599,
        rating: 4.6,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=90",
        description:
            "A lightweight everyday shoulder bag with a clean contemporary aesthetic."
    }

];


/* =====================================================
   STATE
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem("novaeCart")
    ) || [];


let wishlist =
    JSON.parse(
        localStorage.getItem("novaeWishlist")
    ) || [];


let activeCategory = "all";

let couponApplied = false;


/* =====================================================
   ELEMENTS
===================================================== */

const productGrid =
    document.getElementById("productGrid");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const wishlistCount =
    document.getElementById("wishlistCount");

const subtotalElement =
    document.getElementById("subtotal");

const shippingElement =
    document.getElementById("shipping");

const discountElement =
    document.getElementById("discount");

const cartTotalElement =
    document.getElementById("cartTotal");


/* =====================================================
   FORMAT MONEY
===================================================== */

function money(value) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(value);

}


/* =====================================================
   SAVE STATE
===================================================== */

function saveState() {

    localStorage.setItem(
        "novaeCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "novaeWishlist",
        JSON.stringify(wishlist)
    );

}


/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function displayProducts(list = products) {

    productGrid.innerHTML = "";


    if (list.length === 0) {

        productGrid.innerHTML = `

            <div class="col-12 text-center py-5">

                <h3>No products found.</h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    list.forEach(product => {

        const liked =
            wishlist.includes(product.id);


        productGrid.innerHTML += `

            <div
                class="col-6 col-lg-3"
                data-aos="fade-up"
            >

                <div class="product-card">

                    <div class="product-image">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy"
                        >


                        <span class="product-badge">
                            ${product.badge}
                        </span>


                        <button
                            class="wishlist-btn ${liked ? "active" : ""}"
                            onclick="toggleWishlist(${product.id})"
                        >

                            <i class="bi ${liked
                ? "bi-heart-fill"
                : "bi-heart"
            }"></i>

                        </button>


                        <div class="product-hover">

                            <button
                                class="quick-view"
                                onclick="quickView(${product.id})"
                            >
                                QUICK VIEW
                            </button>

                            <button
                                class="add-cart"
                                onclick="addToCart(${product.id})"
                            >
                                ADD TO BAG
                            </button>

                        </div>

                    </div>


                    <div class="product-info">

                        <span class="product-category">
                            ${product.categoryName}
                        </span>

                        <div class="product-name">
                            ${product.name}
                        </div>


                        <div class="product-bottom">

                            <span class="product-price">
                                ${money(product.price)}
                            </span>

                            <span class="rating">

                                ${"★".repeat(
                Math.round(product.rating)
            )}

                                ${product.rating}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        `;

    });

}


/* =====================================================
   FILTER
===================================================== */

document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                this.classList.add("active");


                activeCategory =
                    this.dataset.category;


                applyFilters();

            }
        );

    });


/* =====================================================
   SORT
===================================================== */

document
    .getElementById("sortSelect")
    .addEventListener(
        "change",
        applyFilters
    );


function applyFilters() {

    let result = [...products];


    if (activeCategory !== "all") {

        result =
            result.filter(
                product =>
                    product.category === activeCategory
            );

    }


    const sort =
        document.getElementById(
            "sortSelect"
        ).value;


    if (sort === "low") {

        result.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sort === "high") {

        result.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sort === "rating") {

        result.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    displayProducts(result);

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {

    const product = products.find(product => product.id === id);

    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveState();
    updateCart();

    showToast(`${product.name} added to your bag`);
}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-bag" style="font-size:40px"></i>

                <h5 class="mt-3">
                    Your bag is empty
                </h5>

                <p class="text-muted">
                    Add something beautiful.
                </p>
            </div>
        `;

        cartCount.textContent = 0;
        subtotalElement.textContent = money(0);
        shippingElement.textContent = "FREE";
        discountElement.textContent = "- " + money(0);
        cartTotalElement.textContent = money(0);
        wishlistCount.textContent = wishlist.length;

        return;
    }

    let totalItems = 0;
    let subtotal = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

        subtotal += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h5>${item.name}</h5>

                    <p>${money(item.price)}</p>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                        <button
                            class="remove"
                            onclick="deleteCartItem(${item.id})"
                        >
                            DELETE
                        </button>

                    </div>

                </div>

            </div>
        `;
    });

    // Update bag count
    cartCount.textContent = totalItems;

    let shipping = 0;
    let discount = 0;

    // ₹1000 discount + free shipping
    if (subtotal > 50000) {
        discount += 1000;
        shipping = 0;
    }
    // Shipping ₹99 below ₹1999
    else if (subtotal > 0 && subtotal < 1999) {
        shipping = 99;
    }

    // NOVA10 coupon
    if (couponApplied) {
        discount += Math.round(subtotal * 0.10);
    }

    const total = subtotal + shipping - discount;

    subtotalElement.textContent = money(subtotal);

    shippingElement.textContent =
        shipping === 0
            ? "FREE"
            : money(shipping);

    discountElement.textContent =
        "- " + money(discount);

    cartTotalElement.textContent =
        money(Math.max(total, 0));

    wishlistCount.textContent = wishlist.length;
}
    /* =====================================================
       CHANGE QUANTITY
    ===================================================== */
    function changeQuantity(id, amount) {

        const item = cart.find(item => item.id === id);

        if (!item) return;

        item.quantity += amount;

        // Delete item when quantity becomes 0
        if (item.quantity <= 0) {

            cart = cart.filter(item => item.id !== id);

            showToast("Product removed from bag");
        }

        saveState();
        updateCart();
    }
    function deleteCartItem(id) {

        cart = cart.filter(item => item.id !== id);

        saveState();
        updateCart();

        showToast("Product deleted from bag");
    }

    /* =====================================================
       REMOVE
    ===================================================== */

    function removeItem(id) {

        cart =
            cart.filter(
                item => item.id !== id
            );


        saveState();

        updateCart();

        showToast("Product removed");

    }


    /* =====================================================
       WISHLIST
    ===================================================== */

    function toggleWishlist(id) {

        const index =
            wishlist.indexOf(id);


        if (index === -1) {

            wishlist.push(id);

            showToast(
                "Added to wishlist ❤️"
            );

        } else {

            wishlist.splice(index, 1);

            showToast(
                "Removed from wishlist"
            );

        }


        saveState();

        updateCart();

        applyFilters();

    }


    /* =====================================================
       QUICK VIEW
    ===================================================== */

    function quickView(id) {

        const product =
            products.find(
                item => item.id === id
            );


        const modal =
            document.getElementById(
                "modalProduct"
            );


        modal.innerHTML = `

        <div class="col-lg-6">

            <img
                src="${product.image}"
                class="modal-product-image"
                alt="${product.name}"
            >

        </div>


        <div class="col-lg-6">

            <div class="modal-info">

                <span class="section-label">
                    ${product.categoryName}
                </span>


                <h2>
                    ${product.name}
                </h2>


                <div class="modal-rating">

                    ${"★".repeat(
            Math.round(product.rating)
        )}

                    <span>
                        ${product.rating}
                    </span>

                </div>


                <div class="modal-price">
                    ${money(product.price)}
                </div>


                <p class="modal-description">
                    ${product.description}
                </p>


                <button
                    class="modal-add"
                    onclick="addToCart(${product.id})"
                    data-bs-dismiss="modal"
                >
                    ADD TO BAG
                    <i class="bi bi-bag"></i>
                </button>

            </div>

        </div>

    `;


        const modalInstance =
            new bootstrap.Modal(
                document.getElementById(
                    "productModal"
                )
            );


        modalInstance.show();

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchPanel =
        document.getElementById(
            "searchPanel"
        );


    document
        .getElementById("searchButton")
        .addEventListener(
            "click",
            () => {

                searchPanel.classList.add(
                    "open"
                );

                document
                    .getElementById(
                        "searchInput"
                    )
                    .focus();

            }
        );


    document
        .getElementById("closeSearch")
        .addEventListener(
            "click",
            () => {

                searchPanel.classList.remove(
                    "open"
                );

            }
        );


    document
        .getElementById("searchInput")
        .addEventListener(
            "input",
            function () {

                const query =
                    this.value
                        .toLowerCase()
                        .trim();


                const results =
                    products.filter(product =>

                        product.name
                            .toLowerCase()
                            .includes(query)

                        ||

                        product.categoryName
                            .toLowerCase()
                            .includes(query)

                    );


                const searchResults =
                    document.getElementById(
                        "searchResults"
                    );


                if (!query) {

                    searchResults.innerHTML =
                        "Start typing to search products";

                    return;

                }


                if (results.length === 0) {

                    searchResults.innerHTML =
                        "No products found.";

                    return;

                }


                searchResults.innerHTML =
                    results
                        .slice(0, 5)
                        .map(product => `

                        <div
                            style="
                                padding:10px 0;
                                border-bottom:1px solid var(--border);
                                cursor:pointer;
                            "
                            onclick="searchProduct(${product.id})"
                        >

                            ${product.name}

                            <span style="float:right">
                                ${money(product.price)}
                            </span>

                        </div>

                    `)
                        .join("");

            }
        );


    function searchProduct(id) {

        searchPanel.classList.remove(
            "open"
        );

        quickView(id);

    }


    /* =====================================================
       COUPON
    ===================================================== */

    document
        .getElementById("couponButton")
        .addEventListener(
            "click",
            () => {

                const input =
                    document.getElementById(
                        "couponInput"
                    );


                const message =
                    document.getElementById(
                        "couponMessage"
                    );


                const code =
                    input.value
                        .trim()
                        .toUpperCase();


                if (code === "NOVA10") {

                    couponApplied = true;

                    message.textContent =
                        "✓ 10% discount applied";

                    showToast(
                        "Coupon applied!"
                    );

                    updateCart();

                } else {

                    couponApplied = false;

                    message.textContent =
                        "Invalid coupon. Try NOVA10";

                    updateCart();

                }

            }
        );


    /* =====================================================
       CHECKOUT
    ===================================================== */

    document
        .getElementById("checkoutButton")
        .addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    showToast(
                        "Your bag is empty!"
                    );

                    return;

                }


                showToast(
                    "Checkout demo — payment gateway can be connected here."
                );

            }
        );


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    document
        .getElementById("newsletterForm")
        .addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                showToast(
                    "Welcome to the NOVAÉ world!"
                );


                this.reset();

            }
        );


    /* =====================================================
       DARK MODE
    ===================================================== */

    document
        .getElementById("themeButton")
        .addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark"
                );


                const icon =
                    document.querySelector(
                        "#themeButton i"
                    );


                if (
                    document.body.classList.contains(
                        "dark"
                    )
                ) {

                    icon.className =
                        "bi bi-sun";

                } else {

                    icon.className =
                        "bi bi-moon";

                }

            }
        );


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        document.getElementById(
            "toastText"
        ).textContent = message;


        const toast =
            new bootstrap.Toast(
                document.getElementById(
                    "toast"
                ),
                {
                    delay: 2500
                }
            );


        toast.show();

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById(
            "backTop"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                backTop.classList.add(
                    "show"
                );

            } else {

                backTop.classList.remove(
                    "show"
                );

            }

        }
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       LOADER
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            setTimeout(
                () => {

                    document
                        .getElementById("loader")
                        .classList.add("hidden");

                },
                1600
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    displayProducts();

    updateCart();