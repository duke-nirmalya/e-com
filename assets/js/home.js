// /* =====================================================
//    HOME PAGE
//    Owner: Student A
// ===================================================== */

function initHomePage() {
    renderCollections();
    bindNewsletterForm();
}


// /*
//    TODO(you — Student A): fetch categories via CategoriesAPI.getAll()
//    and render one `.collection-card` per category into #collectionGrid.
//    Reference markup (from the legacy single-page version):

//    <div class="collection-card large">
//        <img src="..." alt="...">
//        <div class="collection-overlay"></div>
//        <div class="collection-content">
//            <span>01 — WOMEN</span>
//            <h3>Effortless <em>Elegance</em></h3>
//            <a href="shop.html?category=women">DISCOVER <i class="bi bi-arrow-up-right"></i></a>
//        </div>
//    </div>

//    Give the first card the "large" class, like the original design.
//    Handle the fetch failure case (show a friendly message instead of
//    a blank section) — this is real production practice, not optional.
// */
// function renderCollections() {
//     const grid = document.getElementById("collectionGrid");

//     // TODO(you — Student A): replace this placeholder with a real fetch call.
//     grid.innerHTML = `<p class="text-muted">Collections loading… (implement renderCollections in assets/js/home.js)</p>`;
// }


function bindNewsletterForm() {
    const form = document.getElementById("newsletterForm");
    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();
        showToast("Welcome to the NOVAÉ world!");
        form.reset();
    });
}
async function initHomePage() {

    try {

        const categories =
            await CategoriesAPI.getAll();

        renderCollections(categories);

    } catch (error) {

        console.error(
            "Error loading collections:",
            error
        );

    }

}


function renderCollections(categories) {

    const collectionGrid =
        document.getElementById("collectionGrid");

    collectionGrid.innerHTML = "";


    categories.forEach(function(category) {

        const card =
            document.createElement("div");

        card.className = "collection-card";


        card.innerHTML = `

            <img
                src="${category.image}"
                alt="${category.name}"
            >

            <div class="collection-overlay">

                <div class="collection-content">

                    <h3>
                        ${category.name}
                    </h3>

                    <p>
                        ${category.description}
                    </p>

                    <a href="shop.html">
                        EXPLORE
                        <i class="bi bi-arrow-up-right"></i>
                    </a>

                </div>

            </div>

        `;


        collectionGrid.appendChild(card);

    });

}