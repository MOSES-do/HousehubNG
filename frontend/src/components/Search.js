import { search_inputEl, form_location, BASE_API_URL, getData, state, resultLength, } from "../common.js";
import navigateTo from "./Router.js";
import renderHouseList from "./HouseList.js";
import handlePageByHash from "./PageReload.js";
import { urlUpdate } from "./QuerytoUrl.js";
import renderSpinner from "./Spinner.js";


export const submitHandler = async (e) => {
    e.preventDefault();
    const query = search_inputEl.value
    try {
        const response = await fetchApi(query);
        if (response.ok) {
            // navigate to product page
            navigateTo("product_list");
            resultLength.textContent = state.searchHouseItems.length
            urlUpdate(query, 'product_list')
            renderHouseList();
        } else {
            const errorData = await response.json();
            alert('Registration failed: ' + errorData.error)
        }

    } catch (error) {
    }

}
form_location.addEventListener('submit', submitHandler)

/* Function to get current data when a new tab of same * page is opened
*  Check if there's a hash in the URL
*/
window.addEventListener('DOMContentLoaded', async () => {
    await handlePageByHash('product_list')
});


// Initial data load into state
export default async function fetchApi(query) {
    const path = query === null ? `apartments` : `apartments?location=${query}`;
    const data = await getData(`${BASE_API_URL}/${path}`)
    // extract job items
    const houseList = data;
    state.searchHouseItems = houseList[0];
    return houseList[1]
}

