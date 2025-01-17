// 'use strict'

import {
    log_in_form,
    container,
    closeForm,
    menu_user,
    callToActionForm,
    nav_links,
    overlay,
} from "../src/common.js"

export function toggleSignUpForm() {
    log_in_form.classList.toggle("hidden");
    overlay.classList.toggle("visible");
}

export function closePopup() {
    log_in_form.classList.add("hidden");
    overlay.classList.remove("visible");
}
closeForm.addEventListener("click", closePopup);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        log_in_form.classList.add("hidden");
        overlay.classList.remove("visible");
    }
})

// cta mobile view 
menu_user.addEventListener('click', () => {
    document.querySelector('.mobile-form').classList.toggle('reveal');
    callToActionForm.classList.toggle("reveal");
    nav_links.classList.toggle("reveal");
    document.body.classList.toggle("no-scroll")
})


callToActionForm.addEventListener('click', function (event) {
    // Check if the clicked element is a child of the parent
    if (event.target !== callToActionForm) {
        // Hide the parent element
        document.querySelector('.mobile-form').classList.remove('reveal');
        callToActionForm.classList.remove("reveal");
        nav_links.classList.remove("reveal");
        document.body.classList.remove("no-scroll")
    }
});

nav_links.addEventListener('click', function (event) {
    // Check if the clicked element is a child of the parent
    if (event.target !== nav_links) {
        // Hide the parent element
        document.querySelector('.mobile-form').classList.remove('reveal');
        callToActionForm.classList.remove("reveal");
        nav_links.classList.remove("reveal");
        document.body.classList.remove("no-scroll")
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelector('.mobile-form').classList.remove('reveal');
        callToActionForm.classList.remove("reveal");
        nav_links.classList.remove("reveal");
        document.body.classList.remove("no-scroll");
    }
})








// dashbord navbar
const openMobileSidebar = document.querySelector('.bg-user2');
const overlay_mobile = document.getElementById('overlay-mobile');
const mobileNavBar = document.querySelector('.mobile_side__nav');
const closeMobileSideBar = document.querySelector('.cancel');



// Open Sidebar
openMobileSidebar.addEventListener('click', function () {
    mobileNavBar.classList.add('open');
    overlay_mobile.classList.add('show');
    closeMobileSideBar.style.display = "block"
});

// Close Sidebar
closeMobileSideBar.addEventListener('click', function () {
    mobileNavBar.classList.remove('open');
    overlay_mobile.classList.remove('show');
    closeMobileSideBar.style.display = "none"
});

// Close Sidebar When Clicking on Overlay
overlay_mobile.addEventListener('click', function () {
    mobileNavBar.classList.remove('open');
    overlay_mobile.classList.remove('show');
    closeMobileSideBar.style.display = "none"
});

