export const index_container = document.querySelector('.container');
export const main_product__container = document.querySelector('.main_product--container');

export const homeListEl = document.querySelector(".product-article");
export const search_inputEl = document.querySelector('.location');
export const form_location = document.querySelector('.search_location');
export const resultLength = document.querySelector('.count__number');
export const spinnerSearchEl = document.querySelector(".spinner--search");
// export const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");
// console.log(resultLength);

export const BASE_API_URL = 'https://aceme.tech/api/v1';

// -- STATE --
export const state = {
    searchHouseItems: [],
    queryParam: '',
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
