// 'use strict'

import {
    log_in_form,
    container,
    closeForm,
    menu_user
} from "../src/common.js"

export function toggleSignUpForm() {
    log_in_form.classList.toggle("hidden");
    container.classList.toggle("overlay");
    document.querySelector('.logo').style.visibility = "hidden";
}

menu_user.addEventListener("click", toggleSignUpForm);

export function closePopup() {
    log_in_form.classList.add("hidden");
    container.classList.remove("overlay");
    document.querySelector('.logo').style.visibility = "visible";

}

closeForm.addEventListener("click", closePopup);


