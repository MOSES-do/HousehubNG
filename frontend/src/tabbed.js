const tabs = document.querySelectorAll(".operations_tab");
const tabsContainer = document.querySelector(".operations_tab-container");
const tabsContent = document.querySelectorAll(".operations_content");

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener("click", function (e) {
    e.preventDefault();
    const clicked = e.target.closest(".operations_tab");
    // Guard clause
    if (!clicked) return;

    // Remove active classes
    tabs.forEach((t) => t.classList.remove("operations_tab--active"));
    tabsContent.forEach((c) => c.classList.remove("operations_content--active"));

    // Activate tab
    clicked.classList.add("operations_tab--active");

    // Activate content area
    document
        .querySelector(`.operations_content--${clicked.dataset.tab}`)
        .classList.add("operations_content--active");
});



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