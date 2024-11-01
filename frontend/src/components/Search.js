import { search_inputEl, form_location, BASE_API_URL, getData, state, resultLength, } from "../common.js";
import navigateTo from "./Router.js";
import renderHouseList from "./HouseList.js";
import renderSpinner from "./Spinner.js";
console.log(state.searchHouseItems)


const submitHandler = async (e) => {
    e.preventDefault();
    const query = search_inputEl.value

    try {

        const response = await fetchApi(query);
        if (response.ok) {
            // navigate to product page
            navigateTo("product_list");
            resultLength.textContent = state.searchHouseItems.length
            renderHouseList();
        } else {
            const errorData = await response.json();
            alert('Registration failed: ' + errorData.error)
        }



    } catch (error) {
        //remove spinner
        // renderSpinner('search');
        // renderError(error.message);
    }

}
form_location.addEventListener('submit', submitHandler)

// Initial data load
document.addEventListener('DOMContentLoaded', async function () {
    await fetchApi()
});

async function fetchApi(query = 'none') {
    const data = await getData(`${BASE_API_URL}/apartments?location=${query}`)
    // extract job items
    const houseList = data;
    state.searchHouseItems = houseList[0];
    return houseList[1]
}

