import fetchApi from "./Search.js";
import renderHouseList from "./HouseList.js";
import { state, resultLength } from "../common.js";
import navigateTo from "./Router.js";
import renderSpinner from "./Spinner.js";
import spinnerSearchEl from "./Spinner.js";
import { submitHandler } from "./Search.js";

let curPage = state.curPage;

export default async function handlePageByHash(currentPage, page) {
    // Open current page in a new tab
    const hashValue = window.location.hash.substring(1);
    if (window.location.hash) {
        if (hashValue === currentPage) {
            // Get the value of the 'search' parameter
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams) {
                const query = urlParams.get('search');
                const response = await fetchApi(query, curPage);
                try {
                    if (response.ok) {
                        resultLength.textContent = state.houselist_search_result_length
                        renderHouseList(state.searchHouseItems);
                    } else {
                        const errorData = await response.json();
                        alert('Error: ' + errorData.error)
                    }
                } catch (error) {
                }
            }

        }
    } else {
        // Optionally, handle the default case if there's no hash
        navigateTo('home'); // Default to "home" or any other default page
    }
}

// infinite scroll logic on pageReload
document.addEventListener('DOMContentLoaded', (e) => {
    const bottomMarker = document.getElementById('bottom-marker');
    renderSpinner('search');
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // if (state.hasMore) {
                state.curPage = curPage++;
                submitHandler(e, curPage);
            }
            // }
        });
    };

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '15px', // Adjust the margin around the root
        threshold: 0
    };

    // Create the Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing the marker
    observer.observe(bottomMarker);
});



// we can also check for hashchange where the functiin is being called
// window.addEventListener('hashchange', async () => {
//     await handlePageByHash('product_list'); // Update based on the new hash
// });