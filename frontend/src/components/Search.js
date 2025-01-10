import { search_inputEl, form_location, BASE_API_URL, getData, state, resultLength, index_container } from "../common.js";
import navigateTo from "./Router.js";
import renderHouseList from "./HouseList.js";
import handlePageByHash from "./PageReload.js";
import { urlUpdate } from "./QuerytoUrl.js";
import { renderScrollLoader } from "./Spinner.js";
import renderInitLoad from "./Spinner.js";

let curPage = state.curPage

export const submitHandler = async (e, curPage, query = "") => {
    e.preventDefault();

    if (!state.hasMore) return;

    if (curPage === 1)
        renderInitLoad('spinner--initial_search')

    state.loading = true;

    try {
        const response = await fetchApi(query, curPage);
        if (response.ok) {
            // navigate to product page
            const data = state.searchHouseItems;
            resultLength.textContent = state.houselist_search_result_length
            urlUpdate(query, 'product_list')
            renderHouseList(data);
            navigateTo("product_list");
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.error)
        }

    } catch (error) {
        console.error('Error fetching list', error)
    } finally {
        if (state.curPage === 1)
            renderInitLoad('stop')
        state.loading = false;
    }
}


// infinite scroll logic for API call to load page
document.addEventListener('DOMContentLoaded', (e) => {
    const bottomMarker = document.getElementById('bottom-marker');
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && state.hasMore && !state.loading) {
                // console.log('You are near the bottom of the page!');
                renderScrollLoader('morecontent_loading')
                state.curPage = curPage++;
                state.loading = true;
                submitHandler(e, curPage).finally(() => {
                    renderScrollLoader('stop')
                });
            }
            // observer.unobserve(entry.target); //only observe on page reload once
        });
    };

    // Options for the Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '100px',
        threshold: 0,
    };

    // Create the Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing the marker
    observer.observe(bottomMarker);
});

form_location.addEventListener('submit', (e) => {
    state.searchHouseItems = [];
    state.pageReload = false;
    const query = search_inputEl.value
    submitHandler(e, state.curPage, query);
})


/* Function to get API data when a new tab of same * page is opened
*  Check if there's a hash in the URL
*/
window.addEventListener('DOMContentLoaded', async () => {
    await handlePageByHash('product_list', index_container)
});


// Initial data load into state
export default async function fetchApi(query, curPage) {
    const path = query === null ? `apartment?page=${curPage}&per_page=10&sort_by=created_at&order=desc` : `apartment?page=${curPage}&per_page=10&sort_by=created_at&order=desc&location=${query}`;

    const data = await getData(`${BASE_API_URL}/${path}`)
    state.hasMore = data[0].pagination.has_more
    state.houselist_search_result_length = data[0].pagination.search_result_length

    // extract job items
    const houseList = data[0].data;
    state.searchHouseItems = [...state.searchHouseItems, ...houseList];
    // console.log(state.searchHouseItems);
    return data[1]
}

