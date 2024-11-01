// Function to handle navigation to a specific page
export default function navigateTo(pageId) {
    // Find all pages and hide them
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');

    // Update the URL in the address bar without reloading the page
    history.pushState({ pageId: pageId }, "", `#${pageId}`);
}

// Handle the browser’s back and forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.pageId) {
        showPage(event.state.pageId);
    } else {
        // Default to home if there's no state
        showPage('home');
    }
});

// Function to show a page by its ID (used in popstate event listener)
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show the target page
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');
}

// Initial page load
document.addEventListener('DOMContentLoaded', () => {
    // Get the page from the URL hash or default to 'home'
    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);
    // Update the URL in the address bar without reloading
    history.replaceState({ pageId: initialPage }, "", `#${initialPage}`);
});
