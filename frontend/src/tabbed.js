import navigateTo from "./components/Router.js";
import { renderAnnouncement } from './components/DashBoard/Announcement.js'
import renderSubscription from './components/DashBoard/Subscription.js'
import renderProfile from './components/DashBoard/Profile.js'
import renderDashboard from './components/DashBoard/Dashboard.js'
import renderListing from './components/DashBoard/Listing.js'
import { renderUserDetails } from './components/DashBoard/UserInfo.js'
import { state } from './common.js'


const tabsContainer = document.querySelector(".operations_tab-container");
const tabs = document.querySelectorAll(".operations_tab");
const tabsContent = document.querySelectorAll(".operations_content");

///////////////////////////////////////
// Tabbed component
const data = state.userEmail;

const destinationRoutes = () => {
    renderAnnouncement();
    renderUserDetails(data);

    if (window.location.hash === "#dashboard")
        renderDashboard();

    if (window.location.hash === "#listings")
        renderListing();

    if (window.location.hash === "#subscription")
        renderSubscription();

    if (window.location.hash === "#profile")
        renderProfile();
}

function manageDashboardActiveTabs() {
    tabsContainer.addEventListener("click", function (e) {
        e.preventDefault();
        const clicked = e.target.closest(".operations_tab");

        // Guard clause
        if (!clicked) return;

        history.replaceState(null, '', `#${clicked.dataset.tool_tip}`);

        // Remove active classes
        tabs.forEach((t) => t.classList.remove("operations_tab--active"));
        tabsContent.forEach((c) => c.classList.remove("operations_content--active"));

        // Activate tab
        if (window.innerWidth <= 600) {
            tabs.forEach((t) => t.classList.remove("operations_tab--active"));
            tabs.forEach((t) => t.classList.add("shrink"));
            destinationRoutes();
        } else {
            clicked.classList.add("operations_tab--active");
            destinationRoutes();
        }

        // Activate content area
        document
            .querySelector(`.operations_content--${clicked.dataset.tab}`)
            .classList.add("operations_content--active");
    });
}
manageDashboardActiveTabs();

function pageVariables(tabNum, pageHash, comp) {
    // Activate content area on pageReload
    comp();
    // console.log(tabNum, pageHash, comp)
    // On page reloasd default to current tab
    history.replaceState(null, '', pageHash);

    const ele = document.querySelector(`.operations_tab--${tabNum}`);

    if (!ele) return;

    tabs.forEach((t) => t.classList.remove("operations_tab--active"));
    tabsContent.forEach((c) => c.classList.remove("operations_content--active"));

    if (window.innerWidth <= 600) {
        tabs.forEach((t) => t.classList.remove("operations_tab--active"));
        tabs.forEach((t) => t.classList.add("shrink"));
    } else {
        ele.classList.add("operations_tab--active");
    }

    document
        .querySelector(`.operations_content--${ele.dataset.tab}`)
        .classList.add("operations_content--active");
}

function onPageReload() {
    renderAnnouncement();
    renderUserDetails(data);

    if (window.location.hash === "#listings") {
        navigateTo('dashboard')
        pageVariables(2, '#listings', renderListing)
    }

    if (window.location.hash === "#subscription") {
        navigateTo('dashboard')
        pageVariables(3, '#subscription', renderSubscription)
    }


    if (window.location.hash === "#profile") {
        navigateTo('dashboard')
        pageVariables(4, '#profile', renderProfile)
    }

}
document.addEventListener('DOMContentLoaded', () => {
    onPageReload();
})


document.querySelector('.tab_reveal').addEventListener('click', () => {
    const tab = document.querySelector('.dashboard_tiles .tab');
    tab.classList.toggle('expanded');

    const operations = document.querySelector('.dashboard_tiles .operations');
    operations.classList.toggle('expanded');

    const userInfo = document.querySelector('.dashboard_tiles .user-info');
    userInfo.classList.toggle('expanded');

    const tabDescription = document.querySelectorAll('.tab_nav--links .role_hide');
    tabDescription.forEach((c) => c.classList.toggle("role_reveal"));

    const tooltip = document.querySelectorAll('.operations_link');
    tooltip.forEach((t) => t.classList.toggle("expanded"))
})