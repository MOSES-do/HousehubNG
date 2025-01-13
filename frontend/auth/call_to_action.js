// 'use strict'

import {
    log_in_form,
    container,
    closeForm,
    menu_user,
    callToActionForm,
    close_form,
} from "../src/common.js"


export function toggleSignUpForm() {
    log_in_form.classList.toggle("hidden");
    container.classList.toggle("overlay");
    document.querySelector('.logo').style.visibility = "hidden";
}

// cta mobile view 
menu_user.addEventListener('click', () => {
    document.querySelector('.mobile-form').classList.toggle('reveal');
    callToActionForm.classList.toggle("reveal");
})

close_form.addEventListener('click', () => {
    document.querySelector('.mobile-form').classList.remove('reveal');
    callToActionForm.classList.remove("reveal");
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        log_in_form.classList.add("hidden");
        container.classList.remove("overlay");
        document.querySelector('.logo').style.visibility = "visible";
    }
})

export function closePopup() {
    log_in_form.classList.add("hidden");
    container.classList.remove("overlay");
    document.querySelector('.logo').style.visibility = "visible";
}

closeForm.addEventListener("click", closePopup);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelector('.mobile-form').classList.remove('reveal');
        callToActionForm.classList.remove("reveal");
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

