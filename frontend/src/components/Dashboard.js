import { state, userInfo } from "../common.js";
import { handleLogout } from "../../auth/logout.js";

window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const listPage = window.location.hash;
    if (listPage === '#dashboard') {
        if (!token) {
            alert('You are not logged in. Redirecting to login page');
            window.location.href = 'index.html';
            return;
        }
    }
});


const renderDashboard = () => {
    userInfo.innerHTML = '';
    const data = state.userEmail;

    const ListingItems = `
    <h2>Current Listings </h2>
    <p id="welcome-user">Welcome, ${data}!</p>    
    `
    userInfo.insertAdjacentHTML('beforeend', ListingItems);

    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('log_out_user')) {
            handleLogout();
        }
    });
}

export default renderDashboard;