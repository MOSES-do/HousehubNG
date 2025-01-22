'use strict'
import { BASE_API_URL, state } from "../src/common.js"
import navBarUpdate from "../src/components/CallToActionForm.js";
import navigateTo from "../src/components/Router.js";



const redirectToHomePage = () => {
    navBarUpdate()
    navigateTo('home')
}

const tabsContent = document.querySelectorAll(".operations_content");

// Deleting JWT upon logout request
export async function handleLogout() {
    const token = localStorage.getItem('token');

    // remove mobile-form overlay, 
    // Shouldn't be visible on logout in product_list page at a width > 600
    // Not sure why, but it is, so i have to remove it on logout
    document.querySelector('.mobile-form').classList.remove('reveal');

    try {
        const response = await fetch(`${BASE_API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('userLog');
            state.isLoggedIn = false;



            // Remove active classes from dashboard
            tabsContent.forEach((c) => c.classList.remove("operations_content--active"));
            const ele = document.querySelector(`.operations_content--1`);
            //  set dashboard default page as active
            ele.classList.add("operations_content--active");


            if (!state.isLoggedIn)
                if (window.location.hash === "#home") {
                    navBarUpdate();
                } else {
                    redirectToHomePage();
                }
        } else {
            const errorData = await response.json();
            localStorage.removeItem('token');
            localStorage.removeItem('userLog');
            redirectToHomePage();
            console.error('Logout failed: ' + errorData.error);
        }
    } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('userLog');
        redirectToHomePage();
        console.error('Logout failed: ' + errorData.error);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('userLog');
        redirectToHomePage();
    }
}