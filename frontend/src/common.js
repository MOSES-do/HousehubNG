export const burger = document.querySelector(".header_nav--hamburger");
export const burgerFirst = document.querySelector(".hamburger--line:first-child");
export const burgerSecond = document.querySelector(".hamburger--line:nth-child(2)");
export const burgerThird = document.querySelector(".hamburger--line:last-child");


export const sign_up = document.querySelector(".sign_up");
export const log_in = document.querySelector(".log_in");
export const log_in_form = document.querySelector(".login-form");
export const container = document.querySelector(".container");
export const closeForm = document.querySelector(".close");
export const menu_user = document.querySelector(".bg-user");

export const submit_email = document.querySelector(".pwd-reset");

export const index_container = document.querySelector('.container');
export const main_product__container = document.querySelector('.main_product--container');
export const main_listing__container = document.querySelector('.main_listing--container');

export const homeListEl = document.querySelector(".product-article");
export const search_inputEl = document.querySelector('.location');
export const form_location = document.querySelector('.search_location');
export const resultLength = document.querySelector('.count__number');
export const spinnerSearchEl = document.querySelector(".spinner--search");
// export const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");
// console.log(resultLength);

export const userInfo = document.querySelector(".user-info");

export const BASE_API_URL = 'https://aceme.tech/api/v1';

// -- STATE --
export const state = {
    searchHouseItems: [],
    queryParam: '',
    userEmail: '',
}

// -- HELPER FUNCTIONS --
export const getData = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        if (!res.ok) throw new Error(data.description)
        return [data, res]
    } catch (error) {
        throw error;
    }
}
