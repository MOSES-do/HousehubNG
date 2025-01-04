// 'use strict'

import {
    log_in_form,
    container,
    closeForm,
    menu_user
} from "../src/common.js"
import navigateTo from "../src/components/Router.js";

export function toggleSignUpForm() {
    log_in_form.classList.toggle("hidden");
    container.classList.toggle("overlay");
}

menu_user.addEventListener("click", toggleSignUpForm);

export function closePopup() {
    log_in_form.classList.add("hidden");
    container.classList.remove("overlay");
}

closeForm.addEventListener("click", closePopup);


