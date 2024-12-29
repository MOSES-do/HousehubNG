import { search_inputEl, form_location, BASE_API_URL, getData, state, resultLength, index_container, spinnerSearchEl, homeListEl } from "../common.js";
import navigateTo from "./Router.js";
import renderHouseList from "./HouseList.js";
import handlePageByHash from "./PageReload.js";
import { urlUpdate } from "./QuerytoUrl.js";
import renderSpinner from "./Spinner.js";



let curPage = state.curPage;

export const submitHandler = async (e, curPage, query = "") => {
    e.preventDefault();

    if (!state.hasMore) return;

    renderSpinner('search')
    state.loading = false;

    try {
        // console.log(query)
        const response = await fetchApi(query, curPage);
        if (response.ok) {
            // navigate to product page
            const data = state.searchHouseItems;

            navigateTo("product_list");
            resultLength.textContent = state.houselist_search_result_length
            urlUpdate(query, 'product_list')

            renderHouseList(data);
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.error)
        }
    } catch (error) {
        console.error('Error fetching list', error)
    } finally {
        renderSpinner();
        state.loading = true;
        // console.log(state.loading);
    }
}


// infinite scroll logic for API call to load page
export const loadMorePages = async () => {
    document.addEventListener('DOMContentLoaded', (e) => {
        const bottomMarker = document.getElementById('bottom-marker');
        renderSpinner('search');
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // console.log('You are near the bottom of the page!');
                    // console.log('Near bottom of the page');
                    if (state.loading) {
                        state.curPage = curPage++;
                        spinnerSearchEl.classList.add('spinner--visible')
                        submitHandler(e, curPage);
                    }
                }
            });
        };

        // Options for the Intersection Observer
        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '200px', // Adjust the margin around the root
            threshold: 0,
        };

        // Create the Intersection Observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Start observing the marker
        observer.observe(bottomMarker);
    });
}
loadMorePages()

form_location.addEventListener('submit', (e) => {
    const query = search_inputEl.value

    submitHandler(e, curPage, query);
})


/* Function to get current data when a new tab of same * page is opened
*  Check if there's a hash in the URL
*/
window.addEventListener('DOMContentLoaded', async () => {
    await handlePageByHash('product_list', index_container)
});


// Initial data load into state
export default async function fetchApi(query, curPage) {
    const path = query === null ? `apartment?page=${curPage}&per_page=20&sort_by=created_at&order=desc` : `apartment?page=${curPage}&per_page=20&sort_by=created_at&order=desc&location=${query}`;

    const data = await getData(`${BASE_API_URL}/${path}`)
    state.hasMore = data[0].pagination.has_more
    state.houselist_search_result_length = data[0].pagination.search_result_length

    // extract job items
    const houseList = data[0].data;
    state.searchHouseItems = [...state.searchHouseItems, ...houseList];
    // console.log(state.searchHouseItems);
    return data[1]
}

