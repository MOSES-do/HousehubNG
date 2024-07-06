'use strict'


const sign_up = document.querySelector(".sign_up");
const log_in = document.querySelector(".log_in");
const log_in_form = document.querySelector(".login-form");
const container = document.querySelector(".container");
const closeForm = document.querySelector(".close");
const menu_user = document.querySelector(".bg-user");
function toggleSignUpForm() {
    log_in_form.classList.toggle("hidden");
    container.classList.toggle("overlay");
}
sign_up.addEventListener("click", toggleSignUpForm)
log_in.addEventListener("click", toggleSignUpForm)
menu_user.addEventListener("click", toggleSignUpForm)

function closePopup() {
    log_in_form.classList.add("hidden");
    container.classList.remove("overlay");
}

closeForm.addEventListener("click", closePopup);
