import { userInfo, state, msg_count, notify_count, userInfo_mobile } from "../../common.js";
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
    msg_count.innerHTML = '';
    notify_count.innerHTML = '';

    const ListingItems = `
    <span class="user_name_salutation">
        <span>Good Afternoon🧰</span>
        <p id="welcome-user"> ${data}!</p>
    </span>   
       `
    msg_count.innerHTML = '2'
    notify_count.innerHTML = '10'
    userInfo.insertAdjacentHTML('afterbegin', ListingItems);
}

export const renderUserDetailsNav = (data) => {
    userInfo_mobile.innerHTML = '';
    msg_count.innerHTML = '';
    notify_count.innerHTML = '';

    const ListingItems = `
    <span class="user_name_salutation">
        <span>Good Afternoon🧰</span>
        <p id="welcome-user"> ${data}!</p>
    </span>   
       `
    msg_count.innerHTML = '2'
    notify_count.innerHTML = '10'
    userInfo_mobile.insertAdjacentHTML('afterbegin', ListingItems);
}


