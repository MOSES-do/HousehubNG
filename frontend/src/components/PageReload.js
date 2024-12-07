import fetchApi from "./Search.js";
import renderHouseList from "./HouseList.js";
import { state, resultLength } from "../common.js";
import navigateTo from "./Router.js";


export default async function handlePageByHash(currentPage, page) {
    // Open current page in a new tab
    const hashValue = window.location.hash.substring(1);
    if (window.location.hash) {
        if (hashValue === currentPage) {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                // Get the value of the 'search' parameter
                const searchQuery = urlParams.get('search');
                const response = await fetchApi(searchQuery);
                if (response.ok) {
                    resultLength.textContent = state.searchHouseItems.length
                    renderHouseList();
                } else {
                    const errorData = await response.json();
                    alert('Registration failed: ' + errorData.error)
                }

            } catch (error) {
            }
        }
    } else {
        // Optionally, handle the default case if there's no hash
        navigateTo('home'); // Default to "home" or any other default page
    }
}



// we can also check for hashchange where the functiin is being called
// window.addEventListener('hashchange', async () => {
//     await handlePageByHash('product_list'); // Update based on the new hash
// });