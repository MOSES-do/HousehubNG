const swiper = new Swiper(".mySwiper", {

    loop: true,
    autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },

    // phones
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        // tablets
        400: {
            slidesPerView: 1,
            spaceBetween: 120
        },

        401: {
            slidesPerView: 2,
            spaceBetween: 250
        },

        450: {
            slidesPerView: 2,
            spaceBetween: 200
        },
        500: {
            slidesPerView: 2,
            spaceBetween: 150
        },
        550: {
            slidesPerView: 2,
            spaceBetween: 120
        },
        579: {
            slidesPerView: 2,
            spaceBetween: 90
        },
        615: {
            slidesPerView: 2,
            spaceBetween: 50
        },

        710: {
            slidesPerView: 3,
            spaceBetween: 290
        },

        810: {
            slidesPerView: 3,
            spaceBetween: 180
        },

        910: {
            slidesPerView: 3,
            spaceBetween: 90
        },

        944: {
            slidesPerView: 3,
            spaceBetween: 60
        },

        // desktop
        1070: {
            slidesPerView: 4,
            spaceBetween: 250
        },

        2030: {
            slidesPerView: 4,
            spaceBetween: 60
        }
    },
});