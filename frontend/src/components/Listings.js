import { state, userInfo } from "../common.js";

const renderListings = () => {
    userInfo.innerHTML = '';
    const data = state.userEmail;

    const ListingItems = `
         <h2>Current Listings </h2>
        <p id="welcome-user">Welcome, ${data}!</p>    
    `
    userInfo.insertAdjacentHTML('beforeend', ListingItems);
}

export default renderListings;