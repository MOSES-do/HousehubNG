// 'use strict'

import {
    log_in_form,
    container,
    closeForm,
    menu_user,
    callToActionForm,
    close_form
} from "../src/common.js"

export function toggleSignUpForm() {
    log_in_form.classList.toggle("hidden");
    container.classList.toggle("overlay");
    document.querySelector('.logo').style.visibility = "hidden";
}


// mobile view
menu_user.addEventListener('click', () => {
    document.querySelector('.mobile-form').classList.toggle('reveal');
    callToActionForm.classList.toggle("reveal");
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelector('.mobile-form').classList.remove('reveal');
        callToActionForm.classList.remove("reveal");
    }
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


