'use strict'

import {
    log_in_form,
    closeForm,
    menu_user,
    callToActionForm,
    nav_links,
    overlay,
} from "../src/common.js"

export function toggleSignUpForm() {
    log_in_form.classList.toggle("hidden");
    overlay.classList.toggle("visible");
    document.body.classList.toggle("no-scroll");
}

export function closePopup() {
    toggleSignUpForm();
}
closeForm.addEventListener("click", closePopup);

overlay.addEventListener("click", toggleSignUpForm);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        log_in_form.classList.add("hidden");
        overlay.classList.remove("visible");
        document.body.classList.remove("no-scroll");
    }
})


// MOBILE
export function toggleCtaMobileForm() {
    document.querySelector('.mobile-overlay').classList.toggle('reveal');
    callToActionForm.classList.toggle("reveal");
    nav_links.classList.toggle("reveal");
    document.body.classList.toggle("no-scroll");
}

// cta mobile view 
menu_user.addEventListener('click', () => {
    toggleCtaMobileForm();
})


callToActionForm.addEventListener('click', function (event) {
    // in mobile view
    // Check if the clicked element is a child of the parent
    if (window.innerWidth < 981)
        if (event.target !== callToActionForm) {
            // Hide the parent element
            toggleCtaMobileForm();
        }
});

nav_links.addEventListener('click', function (event) {
    // in mobile view
    // Check if the clicked element is a child of the parent
    if (window.innerWidth < 981)
        if (event.target !== nav_links) {
            // Hide the parent element
            toggleCtaMobileForm();
        }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelector('.mobile-overlay').classList.remove('reveal');
        callToActionForm.classList.remove("reveal");
        nav_links.classList.remove("reveal");
        document.body.classList.remove("no-scroll");
    }
})


// dashbord navbar
const openMobileSidebar = document.querySelector('.bg-user2');
const overlay_dashboard = document.getElementById('overlay-dashboard');
const mobileNavBar = document.querySelector('.mobile_side__nav');
const closeMobileSideBar = document.querySelector('.cancel');

export function toggleDashboardNavbar() {
    mobileNavBar.classList.toggle('open');
    overlay_dashboard.classList.toggle('show');
    closeMobileSideBar.classList.toggle('reveal');
}

// Open Sidebar
openMobileSidebar.addEventListener('click', function () {
    toggleDashboardNavbar();
});

// Close Sidebar
closeMobileSideBar.addEventListener('click', function () {
    toggleDashboardNavbar();
});

// Close Sidebar When Clicking on Overlay
overlay_dashboard.addEventListener('click', function () {
    toggleDashboardNavbar();
});

// close sidebar on "Escape" keypress
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        mobileNavBar.classList.remove('open');
        overlay_dashboard.classList.remove('show');
        closeMobileSideBar.classList.remove('reveal');
    }
})
