// /* =====================================================
//    SHOP PAGE — listing, filter, sort, search, quick view
//    Owner: Student B
// ===================================================== */

// let allProducts = [];
// let activeCategory = "all";


// async function initShopPage() {
//     bindFilterButtons();
//     bindSortSelect();
//     bindSearchInput();

//     const params = new URLSearchParams(window.location.search);
//     const categoryFromUrl = params.get("category");

//     try {
//         allProducts = await ProductsAPI.getAll();

//         if (categoryFromUrl) {
//             activeCategory = categoryFromUrl;
//             setActiveFilterButton(categoryFromUrl);
//         }

//         applyFilters();
//     } catch (error) {
//         document.getElementById("productGrid").innerHTML =
//             `<div class="col-12 text-center py-5"><h3>Couldn't load products.</h3><p>${error.message}</p></div>`;
//     }
// }


// function setActiveFilterButton(category) {
//     document.querySelectorAll(".filter-btn").forEach(btn => {
//         btn.classList.toggle("active", btn.dataset.category === category);
//     });
// }


// function bindFilterButtons() {
//     document.querySelectorAll(".filter-btn").forEach(button => {
//         button.addEventListener("click", function () {
//             setActiveFilterButton(this.dataset.category);
//             activeCategory = this.dataset.category;
//             applyFilters();
//         });
//     });
// }


// function bindSortSelect() {
//     const select = document.getElementById("sortSelect");
//     if (select) select.addEventListener("change", applyFilters);
// }


// /*
//    TODO(you — Student B): implement live search.
//    - Listen for "input" on #searchInput (it lives in the header
//      partial, so it only exists after initLayout() resolves —
//      which it has, by the time initShopPage() runs).
//    - Filter `allProducts` by name/category (case-insensitive).
//    - Render up to 5 matches into #searchResults, same structure
//      as the reference implementation in legacy/script.js.
// */
// function bindSearchInput() {
//     const input = document.getElementById("searchInput");
//     if (!input) return;

//     // TODO(you — Student B): implement.
// }


// function applyFilters() {
//     let result = [...allProducts];

//     if (activeCategory !== "all") {
//         result = result.filter(product => product.category === activeCategory);
//     }

//     const sort = document.getElementById("sortSelect").value;

//     if (sort === "low") result.sort((a, b) => a.price - b.price);
//     if (sort === "high") result.sort((a, b) => b.price - a.price);
//     if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

//     renderProductGrid(result);
// }


// /*
//    TODO(you — Student B): render `list` into #productGrid.
//    Reference card markup is in legacy/index.html / legacy/script.js
//    (displayProducts function) — reuse that structure:
//    - product image, badge, wishlist heart button (onclick toggleWishlist(id))
//    - hover buttons: "QUICK VIEW" (onclick quickView(id)) and
//      "ADD TO BAG" (onclick should call addToCart(product), from cart.js)
//    - name, price, rating
//    - wrap the image in a link to product.html?id=<id> as well, so
//      visitors can open the dedicated product page.
//    Show a "No products found." state when `list` is empty.
// */
// function renderProductGrid(list) {
//     const grid = document.getElementById("productGrid");

//     // TODO(you — Student B): replace this placeholder.
//     grid.innerHTML = `<div class="col-12 text-center py-5"><p class="text-muted">
//         ${list.length} product(s) loaded — implement renderProductGrid() in assets/js/shop.js
//     </p></div>`;
// }


// /*
//    TODO(you — Student B): implement quickView(id) — find the
//    product in `allProducts`, render its details into #modalProduct
//    (see legacy/script.js for the reference markup) and open it with
//    `new bootstrap.Modal(document.getElementById("productModal")).show()`.
// */
// function quickView(id) {
//     throw new Error("quickView() is not implemented yet — see assets/js/shop.js");
// }

let allProducts = [];

let currentCategory = "all";

let searchText = "";


// Initialize Shop

async function initShopPage() {

    try {

        allProducts =
            await ProductsAPI.getAll();


        setupFilters();

        setupSearch();

        setupSort();

        checkURLCategory();

        renderProducts();


    } catch (error) {

        console.error(
            "Error loading products:",
            error
        );

    }

}


// Render Products

function renderProducts() {

    let products = [...allProducts];


    // Category filter

    if (currentCategory !== "all") {

        products = products.filter(
            function(product) {

                return product.category ===
                    currentCategory;

            }
        );

    }


    // Search filter

    if (searchText !== "") {

        products = products.filter(
            function(product) {

                return product.name
                    .toLowerCase()
                    .includes(searchText);

            }
        );

    }


    // Sort

    const sortValue =
        document.getElementById(
            "sortSelect"
        ).value;


    if (sortValue === "low") {

        products.sort(
            function(a, b) {

                return a.price - b.price;

            }
        );

    }


    if (sortValue === "high") {

        products.sort(
            function(a, b) {

                return b.price - a.price;

            }
        );

    }


    displayProducts(products);

}


// Display Products

function displayProducts(products) {

    const productGrid =
        document.getElementById(
            "productGrid"
        );


    const emptyMessage =
        document.getElementById(
            "emptyMessage"
        );


    const productCount =
        document.getElementById(
            "productCount"
        );


    productGrid.innerHTML = "";


    productCount.textContent =
        products.length;


    if (products.length === 0) {

        emptyMessage.style.display =
            "block";

        return;

    }


    emptyMessage.style.display =
        "none";


    products.forEach(
        function(product) {

            const card =
                document.createElement("div");


            card.className =
                "product-card";


            card.innerHTML = `

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <button
                        class="wishlist-btn"
                        onclick="addToWishlist(${product.id})">

                        <i class="bi bi-heart"></i>

                    </button>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>


                    <h3>
                        ${product.name}
                    </h3>


                    <div class="product-bottom">

                        <strong>
                            ₹${product.price.toLocaleString("en-IN")}
                        </strong>


                        <span class="rating">

                            <i class="bi bi-star-fill"></i>

                            ${product.rating}

                        </span>

                    </div>


                    <button
                        class="add-cart-btn"
                        onclick="addProductToCart(${product.id})">

                        ADD TO BAG

                        <i class="bi bi-bag"></i>

                    </button>

                </div>

            `;


            productGrid.appendChild(card);

        }
    );

}


// Category Filters

function setupFilters() {

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    buttons.forEach(
                        function(btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    currentCategory =
                        this.dataset.category;


                    renderProducts();

                }
            );

        }
    );

}


// Search

function setupSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    searchInput.addEventListener(
        "input",
        function() {

            searchText =
                this.value
                    .toLowerCase()
                    .trim();


            renderProducts();

        }
    );

}


// Sort

function setupSort() {

    document
        .getElementById("sortSelect")
        .addEventListener(
            "change",
            function() {

                renderProducts();

            }
        );

}


// URL Category

function checkURLCategory() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const category =
        params.get("category");


    if (
        category === "women" ||
        category === "men" ||
        category === "accessories"
    ) {

        currentCategory =
            category;


        const button =
            document.querySelector(
                `[data-category="${category}"]`
            );


        if (button) {

            document
                .querySelectorAll(
                    ".filter-btn"
                )
                .forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


            button.classList.add(
                "active"
            );

        }

    }

}


// Add Product To Cart

function addProductToCart(id) {

    const product =
        allProducts.find(
            function(product) {

                return product.id === id;

            }
        );


    if (!product) {

        return;

    }


    // Uses your existing cart system
    

    addToCart(product);


    alert(
        product.name +
        " added to your bag."
    );

}


// Wishlist

function addToWishlist(id) {

    const product =
        allProducts.find(
            function(product) {

                return product.id === id;

            }
        );


    if (!product) {

        return;

    }


    alert(
        product.name +
        " added to wishlist."
    );

}


