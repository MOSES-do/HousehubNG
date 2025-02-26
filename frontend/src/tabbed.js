import navigateTo from "./components/Router.js";
import renderSubscription from './components/DashBoard/Subscription.js'
import renderProfile from './components/DashBoard/Profile.js'
import renderDashboard from './components/DashBoard/Dashboard.js'
import renderListing from './components/DashBoard/Listing.js'

const tabsContainer = document.querySelector(".operations_tab-container");
const tabs = document.querySelectorAll(".operations_tab");
const tabsContent = document.querySelectorAll(".operations_content");

///////////////////////////////////////
// Tabbed component

const RouteComponents = () => {

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
        clicked.classList.add("operations_tab--active");
        RouteComponents();

        // Activate content area
        document
            .querySelector(`.operations_content--${clicked.dataset.tab}`)
            .classList.add("operations_content--active");
    });
}
manageDashboardActiveTabs();

// Activate content area on pageReload
function manageDashboardActiveTabsOnPageReload(tabNum, pageHash, comp) {
    // load component
    comp(); //<-- component

    // console.log(tabNum, pageHash, comp)
    // On page reload default to current tab
    history.replaceState(null, '', pageHash);

    const ele = document.querySelector(`.operations_tab--${tabNum}`);

    if (!ele) return;

    tabs.forEach((t) => t.classList.remove("operations_tab--active"));
    tabsContent.forEach((c) => c.classList.remove("operations_content--active"));

    // Activate tab
    ele.classList.add("operations_tab--active");
    // RouteComponents();

    document
        .querySelector(`.operations_content--${ele.dataset.tab}`)
        .classList.add("operations_content--active");
}

function onPageReload() {

    if (window.location.hash === "#dashboard") {
        navigateTo('dashboard')
        manageDashboardActiveTabsOnPageReload(1, '#dashboard', renderDashboard)
    }

    if (window.location.hash === "#listings") {
        navigateTo('dashboard')
        manageDashboardActiveTabsOnPageReload(2, '#listings', renderListing)
    }

    if (window.location.hash === "#subscription") {
        navigateTo('dashboard')
        manageDashboardActiveTabsOnPageReload(3, '#subscription', renderSubscription)
    }


    if (window.location.hash === "#profile") {
        navigateTo('dashboard')
        manageDashboardActiveTabsOnPageReload(4, '#profile', renderProfile)
    }

}
document.addEventListener('DOMContentLoaded', () => {
    onPageReload();
})


// Reval dashboard icon info on click
const tabExpandBtn = document.querySelector('.tab_reveal')
tabExpandBtn.addEventListener('click', () => {
    const dashBoardHome = document.querySelector('.dashboard_tiles');
    dashBoardHome.classList.toggle('expanded')

    const tabDescription = document.querySelectorAll('.tab span');
    tabDescription.forEach((c) => c.classList.toggle("role_reveal"));

})


// Mobile navbar focus animation setup @600px <
const buttons = document.querySelectorAll('.tab_nav--links button');
const animation = document.querySelector('.tab_nav--links .animation');

// Function to update animation position and width
function updateAnimation(target) {
    const targetRect = target.getBoundingClientRect();
    const parentRect = target.parentElement.getBoundingClientRect();

    // Set the animation's width and position dynamically
    animation.style.width = `${targetRect.width}px`;
    animation.style.transform = `translateX(${targetRect.left - parentRect.left}px)`;
    // console.log(targetRect.width, targetRect.left - parentRect.left)
}

function checkWindowSize(value) {
    if (window.innerWidth < 601)
        updateAnimation(value);
    return;
}

// Add click and focus event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        checkWindowSize(e.currentTarget)
    });
    button.addEventListener('focus', (e) => {
        checkWindowSize(e.currentTarget)
    });
});

// Set initial animation position to the active button on page load
window.addEventListener('DOMContentLoaded', () => {
    const tabs = ['#dashboard', '#listings', '#subscription', '#profile'];
    let i = 0;
    for (i; i < tabs.length; i++) {
        if (window.location.hash === tabs[i]) {
            checkWindowSize(buttons[i])

        }
    }
})

// set active tab on navigation to dashboard
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('dashbtn')) {
        checkWindowSize(buttons[0])
    }
});

// Ensure the animation adjusts on window resize
window.addEventListener('resize', () => {
    const activeButton = document.activeElement.closest('.operations_tab');
    // const activeButton = document.activeElement.closest('.operations_tab') || buttons[0];
    checkWindowSize(activeButton)
});