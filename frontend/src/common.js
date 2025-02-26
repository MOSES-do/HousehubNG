export const DEFAULT_DISPLAY_TIME = 3500;
export const errorEl = document.querySelector('.error');
export const errorTextEl = document.querySelector('.error__text');

export const burger = document.querySelector(".header_nav--hamburger");
export const burgerFirst = document.querySelector(".hamburger--line:first-child");
export const burgerSecond = document.querySelector(".hamburger--line:nth-child(2)");
export const burgerThird = document.querySelector(".hamburger--line:last-child");

export const overlay = document.querySelector('.overlay');

export const sign_up = document.querySelector(".sign_up");
export const log_in = document.querySelector(".log_in");
export const login_btn = document.querySelector(".login-btn");
export const log_in_form = document.querySelector(".login-form");
export const callToActionForm = document.querySelector(".log_user")
export const nav_links = document.querySelector(".header__nav--links")
export const callToActionForm1 = document.querySelector(".log_user1");
export const user_auth = document.querySelector(".user_auth");
export const container = document.querySelector(".container");
export const closeForm = document.querySelector(".close");
export const close_form = document.querySelector(".close_form");

export const menu_user = document.querySelector(".bg-user");

export const submit_email = document.querySelector(".pwd-reset");

export const index_container = document.querySelector('.container');
export const main_product__container = document.querySelector('.main_product--container');
export const main_listing__container = document.querySelector('.main_listing--container');

export const homeListEl = document.querySelector(".product_article");
export const search_inputEl = document.querySelector('.location');
export const form_location = document.querySelector('.search_location');
export const resultLength = document.querySelector('.count__number');
export const spinnerInitialSearchEl = document.getElementById("spinner--initial_search");
export const scroll_loaderEl = document.getElementById("scroll--loader");
export const userLog = JSON.parse(localStorage.getItem('userLog'));

// export const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");
// console.log(resultLength);

export const userInfo = document.querySelector(".user_name_salutation");
export const userInfo_mobile = document.querySelector(".user_name_salutation-mob");
// export const alert = document.querySelector(".alert");
export const userSummary = document.querySelector('.user_summary');
export const operationsContent = document.querySelector('.operations_content');
export const listing = document.querySelector('.operation_listing');
export const subscription = document.querySelector('.operation_subscription');
export const profile = document.querySelector('.operation_profile');
export const msg_count = document.querySelector('.msg_count');
export const notify_count = document.querySelector('.notify_count');
export const BASE_API_URL = 'https://aceme.tech/api/v1';

// -- STATE --
export const state = {
    searchHouseItems: [],
    houselist_search_result_length: '',
    queryParam: '',
    userEmail: '',
    curPage: 1,
    hasMore: true,
    loading: false,
    isLoadingMore: false,
    pageReload: false,
    isLoggedIn: false,
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


