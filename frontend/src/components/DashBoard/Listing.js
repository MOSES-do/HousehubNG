import { listing, getData, BASE_API_URL } from "../../common.js";

const renderListing = () => {
    listing.innerHTML = '';
    async function fetchApi(query, curPage) {
        const path = query === null ? `apartment?page=${curPage}&per_page=10&sort_by=created_at&order=desc` : `apartment?page=${curPage}&per_page=10&sort_by=created_at&order=desc&location=${query}`;

        const data = await getData(`${BASE_API_URL}/${path}`)
        // extract job items
        const houseList = data[0].data;

        const ListingData = `
             we got this listing
            ${houseList.map(h => `<div>${JSON.stringify(h)}</div>`)}
        `
        listing.insertAdjacentHTML('afterbegin', ListingData);
    }
    fetchApi('', 1)
}

export default renderListing;