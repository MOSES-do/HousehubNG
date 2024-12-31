import fetchApi from "./Search.js";
import renderHouseList from "./HouseList.js";
import { state, resultLength } from "../common.js";
import navigateTo from "./Router.js";
import renderInitLoad from "./Spinner.js";
import { renderScrollLoader } from "./Spinner.js";

let curPage = state.curPage;

export default async function handlePageByHash(currentPage, page) {
    // Open current page in a new tab
    const hashValue = window.location.hash.substring(1);
    state.pageReload = true;
    if (window.location.hash) {
        if (hashValue === currentPage) {
            // Get the value of the 'search' parameter
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams) {
                if (curPage === 1)
                    renderInitLoad('spinner--initial_search')

                state.loading = true;

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
                } finally {
                    if (state.curPage === 1)
                        renderInitLoad('stop')
                    state.loading = false;
                }
            }
        }
    } else {
        // Optionally, handle the default case if there's no hash
        navigateTo('home'); // Default to "home" or any other default page
    }
}



// infinite scroll logic on pageReload using Intersection Observer API
const bottomMarker = document.getElementById('bottom-marker');
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && state.hasMore && !state.loading && state.pageReload) {
            renderScrollLoader('morecontent_loading')
            state.curPage = curPage++;
            state.loading = true;
            fetchMorePages().finally(() => {
                renderScrollLoader('stop')
            });
        }
    })
}

async function fetchMorePages() {
    const urlParams = new URLSearchParams(window.location.search);
    try {
        if (urlParams) {
            const query = urlParams.get('search')
            const response = await fetchApi(query, curPage);
            if (response.ok) {
                renderHouseList(state.searchHouseItems);
            }
        }
    } catch (error) {

    } finally {
        renderScrollLoader('stop')
    }
}

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