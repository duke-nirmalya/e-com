async function initCollectionsPage() {

    try {

        const categories =
            await CategoriesAPI.getAll();

        renderCollectionsPage(categories);

    } catch (error) {

        console.error(
            "Error loading collections:",
            error
        );

    }

}


function renderCollectionsPage(categories) {

    const collectionsGrid =
        document.getElementById("collectionsGrid");


    collectionsGrid.innerHTML = "";


    categories.forEach(function(category) {

        const card =
            document.createElement("div");

        card.className = "collection-page-card";


        card.innerHTML = `

            <div class="collection-page-image">

                <img
                    src="${category.image}"
                    alt="${category.name}"
                >

            </div>


            <div class="collection-page-content">

                <span>
                    COLLECTION
                </span>

                <h3>
                    ${category.name}
                </h3>

                <p>
                    ${category.description}
                </p>

                <a
                    href="shop.html?category=${category.name.toLowerCase()}"
                >
                    SHOP ${category.name.toUpperCase()}
                    <i class="bi bi-arrow-up-right"></i>
                </a>

            </div>

        `;


        collectionsGrid.appendChild(card);

    });

}

