
/**
 * Add query/search parameter to the url for easy retrieval
 */

export function urlUpdate(searchInput, customPath) {
    const query = searchInput.trim();
    if (query) {
        // URLSearchParams object with current URL params
        const urlParams = new URLSearchParams(window.location.search)

        // Update the "search" parameter with user's query
        urlParams.set('search', query);

        // Update the URL without reloading the page
        const newUrl = `/?${urlParams.toString()}#${customPath}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }
}