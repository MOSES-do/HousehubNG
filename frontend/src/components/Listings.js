import { state, userInfo } from "../common.js";


window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    const listPage = window.location.hash;
    if (listPage === '#listings') {
        if (!token) {
            alert('You are not logged in. Redirecting to login page');
            window.location.href = 'index.html';
            return;
        }
    }
});

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