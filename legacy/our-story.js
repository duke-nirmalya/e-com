/* =====================================================
   OUR STORY — STATS
===================================================== */

const statValues = [
    26,      // Countries
    48000,   // Community
    4.9      // Rating
];

const statElements =
    document.querySelectorAll(".stat-item strong");


/* =====================================================
   DISPLAY STATS
===================================================== */

function updateStats() {

    // Countries
    statElements[0].textContent =
        statValues[0];


    // Community
    statElements[1].textContent =
        statValues[1] >= 1000
            ? Math.floor(statValues[1] / 1000) 
            : statValues[1];


    // Rating
    statElements[2].textContent =
        statValues[2].toFixed(1);

}


/* =====================================================
   PLUS BUTTON
===================================================== */

document
    .querySelectorAll(".plus")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(this.dataset.index);


                if (index === 0) {

                    // Countries +1
                    statValues[index] += 1;

                }

                else if (index === 1) {

                    // Community +1000
                    statValues[index] += 1000;

                }

                else if (index === 2) {

                    // Rating +0.1
                    if (statValues[index] < 5) {

                        statValues[index] =
                            Math.min(
                                5,
                                statValues[index] + 0.1
                            );

                    }

                }


                updateStats();

            }
        );

    });


/* =====================================================
   MINUS BUTTON
===================================================== */

document
    .querySelectorAll(".minus")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(this.dataset.index);


                if (index === 0) {

                    // Countries -1
                    if (statValues[index] > 0) {

                        statValues[index] -= 1;

                    }

                }

                else if (index === 1) {

                    // Community -1000
                    if (statValues[index] >= 1000) {

                        statValues[index] -= 1000;

                    }

                }

                else if (index === 2) {

                    // Rating -0.1
                    if (statValues[index] > 0) {

                        statValues[index] =
                            Math.max(
                                0,
                                statValues[index] - 0.1
                            );

                    }

                }


                updateStats();

            }
        );

    });


/* =====================================================
   STORY IMAGE SWIPER
===================================================== */

const storySwiper =
    new Swiper(".storySwiper", {

        loop: true,

        speed: 700,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },

        navigation: {
            nextEl:
                ".storySwiper .swiper-button-next",

            prevEl:
                ".storySwiper .swiper-button-prev"
        },

        pagination: {
            el:
                ".storySwiper .swiper-pagination",

            clickable: true
        }

    });


/* =====================================================
   INITIALIZE STORY STATS
===================================================== */

updateStats();