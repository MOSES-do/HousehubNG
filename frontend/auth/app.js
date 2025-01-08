'use strict';
import { burger, burgerFirst, burgerSecond, burgerThird, BASE_API_URL, login_btn } from "../src/common.js"
import navBarUpdate from "../src/components/CallToActionForm.js";
import renderDashboard from "../src/components/Dashboard.js";
import { state, closeForm } from "../src/common.js";
import { closePopup } from "./call_to_action.js";
import { oauthUrlRedirectCleanUp, generalUrlRedirectCleanUp } from "./utils.js";
import { handleLogout } from "./logout.js";
import navigateTo from "../src/components/Router.js";
import houseListNavUpdate from "../src/components/HouseListForm.js";

burger.addEventListener("click", function (e) {
    burgerFirst.classList.toggle("line-1");
    burgerSecond.classList.toggle("line-2");
    burgerThird.classList.toggle("line-3");
});


function decodeJWT(token) {
    // Split the token into its parts
    const parts = token.split('.');

    // Check if the token has three parts (header, payload, signature)
    if (parts.length !== 3) {
        throw new Error('Invalid token');
    }
    const payload = parts[1];
    const decodedPayload = atob(payload);
    const payloadObject = JSON.parse(decodedPayload);
    return payloadObject;
}

/**======SIGN UP, LOGIN========**/
export async function handleRegistration() {
    //Sign up FUNCTIONALITY
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pwd').value;
    try {
        const response = await fetch(`${BASE_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            alert("Email verification link has been sent to your mail");
        } else {
            const errorData = await response.json();
            alert('Registration failed: ' + errorData.error)
        }
    } catch (error) {
        console.log("Registration failed")
    }
}

export async function handleLogin() {
    //LOGIN FUNCTIONALITY
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pwd').value;
    try {
        const response = await fetch(`${BASE_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            const tokenPayload = decodeJWT(data.token);

            // localStorage.setItem('userName', data.token.email)
            if (tokenPayload.sub.verified === true) {
                const token = localStorage.getItem('token');
                fetchProtectedContent(token)
            } else {
                alert("To log in, complete email verification")
            }

        } else {
            const errorData = await response.json();
            alert('Login failed: ' + errorData.error)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

export async function fetchProtectedContent(token) {
    try {
        const response = await fetch(`${BASE_API_URL}/current_user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const data = await response.json();
            state.userEmail = data.email;
            localStorage.setItem('userLog', JSON.stringify({
                'userEmail': data.email,
                'isLoggedIn': state.isLoggedIn = true
            }));
            const hash = window.location.hash;
            closeForm.addEventListener("click", closePopup());
            if (window.location.hash === "#home") {
                navBarUpdate();
                oauthUrlRedirectCleanUp('home');
                generalUrlRedirectCleanUp(hash)
            }

            // on login thru product page
            if (window.location.hash === "#product_list") {
                houseListNavUpdate();
                generalUrlRedirectCleanUp(hash)
            }

            // On page reload
            if (window.location.hash === "#dashboard") {
                renderDashboard();
                generalUrlRedirectCleanUp(hash)
            }

        } else {
            alert('Failed to fetch protected content');
        }
    } catch (e) {
        console.error('Error:', error);
        alert('Failed to fetch protected content');
    }
}

// On page refresh/open a new tab
window.addEventListener('DOMContentLoaded', async (e) => {
    const token = localStorage.getItem('token');

    const listPage = window.location.hash;
    if (listPage === '#dashboard') {
        fetchProtectedContent(token)
    }
});

//==================================== GO0gle Auth ========================================//
document.querySelector('.g-auth').addEventListener('click', function () {
    fetch(`${BASE_API_URL}/login/google`)
        .then(response => response.json())
        .then(data => {
            window.location.href = data.authorization_url;
        });
});


window.addEventListener('load', () => {
    /**
        check if url path includes callback route
        No longer required since login is on the homepage of the website,
        our redirect_uri simply points to the back homepage of the website 
        if (window.location.href.includes('/oauth2/callback')) {
        }
    */
    const urlParams = new URLSearchParams(window.location.search);
    const oauthCode = urlParams.get('code');
    if (oauthCode)
        handleOAuthCallback();
})

const handleOAuthCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthCode = urlParams.get('code');
    if (oauthCode) {
        try {
            // Send the code to the backend using a POST request
            const response = await fetch(`${BASE_API_URL}/oauth2/callback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: oauthCode }),
            });

            const data = await response.json();
            if (data.token) {
                // Save the token to localStorage
                localStorage.setItem('token', data.token);
                fetchProtectedContent(data.token)
            } else {
                console.error('Error: No token received');
            }
        } catch (error) {
            console.error('Authentication error:', error);
        } finally {
        }
    } else {
        console.error('OAuth code not found');
    }
}



document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('log_out_user')) {
        handleLogout();
    }

    if (event.target.classList.contains('log_in')) {
        login_btn.removeEventListener('click', handleRegistration)
        login_btn.addEventListener('click', handleLogin)
    }
    if (event.target.classList.contains('sign_up')) {
        login_btn.removeEventListener('click', handleLogin)
        login_btn.addEventListener('click', handleRegistration)
    }


    if (event.target.classList.contains('dashbtn')) {
        renderDashboard();
        navigateTo('dashboard');
    }
});


const userLog = JSON.parse(localStorage.getItem('userLog'));
// On pageload check if userEmail and logState is available in localStorage
if (userLog) {
    state.userEmail = userLog.userEmail;
    state.isLoggedIn = userLog.isLoggedIn;
    navBarUpdate();
} else {
    navBarUpdate();
}