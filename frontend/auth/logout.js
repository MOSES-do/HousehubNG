'use strict'
import { BASE_API_URL, state } from "../src/common.js"
import navBarUpdate from "../src/components/CallToActionForm.js";
import navigateTo from "../src/components/Router.js";
import { generalUrlRedirectCleanUp } from "./utils.js";



const redirectToHomePage = () => {
    navBarUpdate()
    navigateTo('home')
}
// Deleting JWT upon logout request
export async function handleLogout() {
    const token = localStorage.getItem('token');

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
            if (!state.isLoggedIn)
                if (window.location.hash === "#home") {
                    navBarUpdate();
                } else {
                    redirectToHomePage();
                }
        } else {
            const errorData = await response.json();
            console.error('Logout failed: ' + errorData.error);
        }
    } catch (error) {
        console.error('Error:', error);
        console.error('Logout failed: ' + errorData.error);
    } finally {
        // remove .html from url object
        localStorage.removeItem('token');
        localStorage.removeItem('userLog');
        redirectToHomePage();
    }
}

// mace36381 @gmail.com




