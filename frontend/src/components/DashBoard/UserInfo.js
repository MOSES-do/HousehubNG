import { userInfo, state } from "../../common.js";

window.addEventListener('DOMContentLoaded', async () => {
    const listPage = window.location.hash;
    // On page refresh/open a new tab
    if (listPage === "#dashboard") {
        const data = state.userEmail;
        renderUserDetails(data)
    }
});


export const renderUserDetails = (data) => {
    userInfo.innerHTML = '';

    const ListingItems = `   
        <p id="welcome-user">Welcome, ${data}!</p>
         <h2 class="post">Post a property</h2>
    `
    userInfo.insertAdjacentHTML('afterbegin', ListingItems);
}


