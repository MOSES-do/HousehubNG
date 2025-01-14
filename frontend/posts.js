import { state } from "./src/common.js";
import renderHouseList from "./src/components/HouseList.js";

export function posts() {
    const url = new URL(window.location.href);
    console.log(url)
    const hasHtml = url.pathname.includes('posts.html');

    if (hasHtml) {
        console.log(true)
        renderHouseList(state.searchHouseItems)
    }

}

// remove .html from url object
window.addEventListener('DOMContentLoaded', () => {
    posts();
})