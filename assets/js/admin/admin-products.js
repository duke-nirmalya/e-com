/* =====================================================
   ADMIN — PRODUCTS CRUD
   Owner: Student D

   This page exercises every piece of ProductsAPI that is
   currently a TODO in assets/js/common/api.js (create/update/
   remove). Implement those first, then wire this UI to them.
===================================================== */

async function initProductsAdminPage() {
    bindNewProductButton();
    bindCancelFormButton();
    bindProductForm();
    await loadAndRenderProducts();
}


async function loadAndRenderProducts() {
    const tbody = document.getElementById("productTableBody");

    try {
        const products = await ProductsAPI.getAll();
        renderProductTable(products);
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="6" class="admin-error">${error.message}</td></tr>`;
    }
}


/*
   TODO(you — Student D): render one <tr> per product into
   #productTableBody with columns: thumbnail, name, category,
   price, stock, and Edit/Delete buttons.

   - "Edit" should call openProductForm(product) (see below).
   - "Delete" should confirm(), then call ProductsAPI.remove(id),
     then reload the table.
*/
function renderProductTable(products) {
    const tbody = document.getElementById("productTableBody");

    // TODO(you — Student D): replace this placeholder.
    tbody.innerHTML = `<tr><td colspan="6">${products.length} product(s) loaded — implement renderProductTable()</td></tr>`;
}


function bindNewProductButton() {
    document.getElementById("newProductButton").addEventListener("click", () => {
        openProductForm(null);
    });
}


function bindCancelFormButton() {
    document.getElementById("cancelFormButton").addEventListener("click", () => {
        document.getElementById("productFormCard").hidden = true;
    });
}


/** Pass `null` for create mode, or a product object for edit mode. */
function openProductForm(product) {
    document.getElementById("productFormCard").hidden = false;
    document.getElementById("formTitle").textContent = product ? "Edit product" : "New product";
    document.getElementById("formError").textContent = "";

    document.getElementById("productId").value = product ? product.id : "";
    document.getElementById("fieldName").value = product ? product.name : "";
    document.getElementById("fieldCategory").value = product ? product.category : "women";
    document.getElementById("fieldPrice").value = product ? product.price : "";
    document.getElementById("fieldStock").value = product ? product.stock : "";
    document.getElementById("fieldBadge").value = product ? product.badge : "";
    document.getElementById("fieldImage").value = product ? product.image : "";
    document.getElementById("fieldDescription").value = product ? product.description : "";
}


function bindProductForm() {
    const form = document.getElementById("productForm");

    form.addEventListener("submit", async event => {
        event.preventDefault();
        const errorEl = document.getElementById("formError");
        errorEl.textContent = "";

        const id = document.getElementById("productId").value;

        const categorySelect = document.getElementById("fieldCategory");
        const productData = {
            name: document.getElementById("fieldName").value.trim(),
            category: categorySelect.value,
            categoryName: categorySelect.options[categorySelect.selectedIndex].text,
            price: Number(document.getElementById("fieldPrice").value),
            stock: Number(document.getElementById("fieldStock").value),
            badge: document.getElementById("fieldBadge").value.trim() || "NEW",
            image: document.getElementById("fieldImage").value.trim(),
            description: document.getElementById("fieldDescription").value.trim(),
            rating: 5.0
        };

        // TODO(you — Student D): remove this guard once ProductsAPI.create/update are implemented.
        if (true) {
            errorEl.textContent = "Save is not wired up yet — implement ProductsAPI.create/update first.";
            return;
        }

        try {
            if (id) await ProductsAPI.update(Number(id), productData);
            else await ProductsAPI.create(productData);

            document.getElementById("productFormCard").hidden = true;
            await loadAndRenderProducts();
        } catch (error) {
            errorEl.textContent = error.message;
        }
    });
}
