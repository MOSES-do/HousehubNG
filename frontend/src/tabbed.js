import navigateTo from "./components/Router.js";
// import { renderAnnouncement } from './components/DashBoard/Announcement.js'
import renderSubscription from './components/DashBoard/Subscription.js'
import renderProfile from './components/DashBoard/Profile.js'
import renderDashboard from './components/DashBoard/Dashboard.js'
import renderListing from './components/DashBoard/Listing.js'
import { renderUserDetails } from './components/DashBoard/UserInfo.js'
import { operationsContent, state } from './common.js'


const tabsContainer = document.querySelector(".operations_tab-container");
const tabs = document.querySelectorAll(".operations_tab");
const tabsContent = document.querySelectorAll(".operations_content");

///////////////////////////////////////
// Tabbed component
const data = state.userEmail;

const destinationRoutes = () => {
    // renderAnnouncement();
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
        clicked.classList.add("operations_tab--active");
        destinationRoutes();

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
    // On page reload default to current tab
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
    // renderAnnouncement();
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

const tabExpandBtn = document.querySelector('.tab_reveal')
tabExpandBtn.addEventListener('click', () => {
    const dashBoardHome = document.querySelector('.dashboard_tiles');
    dashBoardHome.classList.toggle('expanded')

    const tabDescription = document.querySelectorAll('.tab_nav--links .role_hide');
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
        // remove padding on click of icon that trigger mobile browser resize
        tab.classList.remove('scrolling-down');
    });
    button.addEventListener('focus', (e) => {
        checkWindowSize(e.currentTarget)
    });
});

// Set initial animation position to the first button on page load
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




const tab = document.querySelector('.dashboard_tiles .tab');
/** */
// let lastScrollY = 0;
// window.addEventListener('scroll', function () {

//     if (window.innerWidth < 601) {
//         if (this.window.scrollY > lastScrollY) {
//             tab.style.paddingBottom = '3rem';
//             tab.style.marginTop = '-2.3rem';
//         } else {
//             tab.style.paddingBottom = '0rem';
//             tab.style.marginTop = '0rem';
//         }
//         lastScrollY = this.window.scrollY;
//     }
// });



/**===Refactor===**/
let lastScrollY = 0;
let isScrollingUp = false;
// Throttle function to limit how often the scroll handler runs
function throttle(callback, limit) {
    let waiting = false;
    return function () {
        if (!waiting) {
            callback.apply(this, arguments);
            waiting = true;
            setTimeout(() => (waiting = false), limit);
        }
    };
}

function resizeRender() {
    window.addEventListener('resize', throttle(() => {
        if (window.innerWidth < 601) {
            tab.classList.toggle('scrolling-down');
            console.log(isScrollingUp)
        }
    }, 100));
}



function handleScroll() {
    if (window.innerWidth < 601) {
        const currentScrollY = window.scrollY;
        console.log(currentScrollY, lastScrollY)
        if (currentScrollY > lastScrollY) {
            tab.classList.remove('scrolling-up');
            tab.classList.add('scrolling-down');

            isScrollingUp = true;
            if (isScrollingUp)
                resizeRender()
        } else {
            tab.classList.add('scrolling-up');
            tab.classList.remove('scrolling-down');
            isScrollingUp = false;
        }
        // Update lastScrollY
        lastScrollY = currentScrollY;

    }
    tab.classList.add('scrolling-up');
    tab.classList.remove('scrolling-down');
}

// Add throttled scroll event listener
window.addEventListener('scroll', throttle(handleScroll, 100))