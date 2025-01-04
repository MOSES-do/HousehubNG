'use strict';
import { burger, burgerFirst, burgerSecond, burgerThird, BASE_API_URL } from "../src/common.js"
import navBarUpdate from "../src/components/CallToActionForm.js";
import renderDashboard from "../src/components/Dashboard.js";
import { state, closeForm } from "../src/common.js";
import { closePopup } from "./call_to_action.js";
// import { cleanUpUrlOnRedirect } from "./utils.js";

const userLog = JSON.parse(localStorage.getItem('userLog'));
// On pageload check if userEmail and logState is available in localStorage
if (userLog) {
    state.userEmail = userLog.userEmail;
    state.isLoggedIn = userLog.isLoggedIn;
}

burger.addEventListener("click", function (e) {
    burgerFirst.classList.toggle("line-1");
    burgerSecond.classList.toggle("line-2");
    burgerThird.classList.toggle("line-3");
});

// Check if user is logged in to determine call to action form to display
navBarUpdate();

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

            // navigate to listing page
            closeForm.addEventListener("click", closePopup());
            // cleanUpUrlOnRedirect('#dashboard');
            renderDashboard();
            cleanUpUrlOnRedirect();
            navBarUpdate();
        } else {
            alert('Failed to fetch protected content');
        }
    } catch (e) {
        console.error('Error:', error);
        alert('Failed to fetch protected content');
    }
}
export function cleanUpUrlOnRedirect() {
    const currentUrl = window.location.href;
    const hash = window.location.hash;

    if (hash === '#home') {
        const baseUrl = 'https://househubng.netlify.app/';
        if (currentUrl !== baseUrl) {
            history.replaceState(null, '', baseUrl);
        }
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
    // cleanUpUrlOnRedirect();
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
        }
    } else {
        console.error('OAuth code not found');
    }
}





