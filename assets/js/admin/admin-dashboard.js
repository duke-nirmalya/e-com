/* =====================================================
   ADMIN DASHBOARD
   Owner: Student D
===================================================== */

async function initDashboardPage() {
    const statsCard = document.getElementById("statsCard");

    try {
        const products = await ProductsAPI.getAll();
        const orders = Storage.get("novae_orders", []);

        // TODO(you — Student D): replace this with a nicer stat-card
        // layout (e.g. 3 columns: Products / Orders / Revenue).
        statsCard.innerHTML = `
            <p>Total products: <strong>${products.length}</strong></p>
            <p>Total orders: <strong>${orders.length}</strong></p>
        `;
    } catch (error) {
        statsCard.innerHTML = `<p class="admin-error">${error.message}</p>`;
    }
}
