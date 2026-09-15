/* =====================================================
   PRODUCT DETAIL PAGE
   Owner: Student B
===================================================== */

async function initProductPage() {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const container = document.getElementById("productDetail");

    if (!id) {
        container.innerHTML = `<div class="col-12 text-center py-5"><h3>No product selected.</h3></div>`;
        return;
    }

    try {
        const product = await ProductsAPI.getById(id);

        if (!product) {
            container.innerHTML = `<div class="col-12 text-center py-5"><h3>Product not found.</h3></div>`;
            return;
        }

        renderProductDetail(product);
    } catch (error) {
        container.innerHTML = `<div class="col-12 text-center py-5"><h3>Couldn't load this product.</h3><p>${error.message}</p></div>`;
    }
}


/*
   TODO(you — Student B): render the full product detail layout
   into #productDetail (two columns: image on the left, name/price/
   rating/description/ADD TO BAG button on the right — see the
   quickView() markup in legacy/script.js for a close reference).
   The "ADD TO BAG" button should call addToCart(product) (from cart.js).
*/
function renderProductDetail(product) {
    const container = document.getElementById("productDetail");

    // TODO(you — Student B): replace this placeholder.
    container.innerHTML = `<div class="col-12"><p class="text-muted">Loaded "${product.name}" — implement renderProductDetail() in assets/js/product.js</p></div>`;
}
