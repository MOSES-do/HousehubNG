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
        600: {
            slidesPerView: 2,
            spaceBetween: 40
        },
        // desktop
        1024: {
            slidesPerView: 3,
            spaceBetween: 10
        },

        2030: {
            slidesPerView: 4,
            spaceBetween: 60
        }
    },
});