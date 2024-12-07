'use strict'

import {
    sign_up,
    log_in,
    log_in_form,
    container,
    closeForm,
    menu_user
} from "../src/common.js"


function toggleSignUpForm() {
    log_in_form.classList.toggle("hidden");
    container.classList.toggle("overlay");
}
sign_up.addEventListener("click", toggleSignUpForm);
log_in.addEventListener("click", toggleSignUpForm);
menu_user.addEventListener("click", toggleSignUpForm);

function closePopup() {
    log_in_form.classList.add("hidden");
    container.classList.remove("overlay");
}

closeForm.addEventListener("click", closePopup);
