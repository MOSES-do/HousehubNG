'use strict';

const burger = document.querySelector(".header_nav--hamburger");
const burgerFirst = document.querySelector(".hamburger--line:first-child");
const burgerSecond = document.querySelector(".hamburger--line:nth-child(2)");
const burgerThird = document.querySelector(".hamburger--line:last-child");

burger.addEventListener("click", function (e) {
    burgerFirst.classList.toggle("line-1");
    burgerSecond.classList.toggle("line-2");
    burgerThird.classList.toggle("line-3");
});



const sign_up = document.querySelector(".sign_up");
const log_in = document.querySelector(".log_in");
const log_in_form = document.querySelector(".login-form");
const container = document.querySelector(".container");
const closeForm = document.querySelector(".close");

function toggleSignUpForm() {
    log_in_form.classList.toggle("hidden");
    container.classList.toggle("overlay");
}
sign_up.addEventListener("click", toggleSignUpForm)
log_in.addEventListener("click", toggleSignUpForm)

function closePopup() {
    log_in_form.classList.add("hidden");
    container.classList.remove("overlay");
}

closeForm.addEventListener("click", closePopup);

