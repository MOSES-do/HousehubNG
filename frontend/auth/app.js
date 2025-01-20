'use strict';
import { burger, burgerFirst, burgerSecond, burgerThird, BASE_API_URL, login_btn, userLog, state, callToActionForm, closeForm } from "../src/common.js"
import navBarUpdate from "../src/components/CallToActionForm.js";
import renderDashboard from "../src/components/DashBoard/Dashboard.js";
import { renderUserDetails, renderUserDetailsNav } from "../src/components/DashBoard/UserInfo.js";
import { closePopup } from "./call_to_action.js";
import { oauthUrlRedirectCleanUp } from "./utils.js";
import { handleLogout } from "./logout.js";
import navigateTo from "../src/components/Router.js";
import houseListNavUpdate from "../src/components/HouseListForm.js";
import { renderAnnouncement } from "../src/components/DashBoard/Announcement.js";

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
            if (hash === "#home") {
                navBarUpdate();
                oauthUrlRedirectCleanUp('home');
            }

            // on login thru product page
            if (hash === "#product_list")
                houseListNavUpdate();
        } else {
            alert('Failed to fetch protected content');
        }
    } catch (e) {
        console.error('Error:', error);
        alert('Failed to fetch protected content');
    }
}

//==================================== GO0gle Auth ========================================//
let authFlow = false;
document.querySelector('.g-auth').addEventListener('click', function () {
    fetch(`${BASE_API_URL}/login/google`)
        .then(response => response.json())
        .then(data => {
            window.location.href = data.authorization_url;
        });
    authFlow = true;
});


let oauthCode;
window.addEventListener('load', () => {
    // Automatically prompt user authentication
    google.accounts.id.initialize({
        client_id: "119453756942-20vc1f6u1fdi4bdv0upidob2s14am44q.apps.googleusercontent.com",
        callback: async (response) => {
            if (response.credential) {
                const route = 'google-signin';
                await processSignInRequest(route);
            }
        }
    })

    if (window.location.hash === '#home' && !state.isLoggedIn && !authFlow)
        google.accounts.id.prompt();

    /**
        check if url path includes callback route
        No longer required since login is on the homepage of the website,
        our redirect_uri simply points to the back homepage of the website 
        if (window.location.href.includes('/oauth2/callback')) {
        }
    */

    const urlParams = new URLSearchParams(window.location.search);
    oauthCode = urlParams.get('code');
    if (oauthCode)
        handleOAuthCallback();
})

const handleOAuthCallback = async () => {
    if (oauthCode) {
        const route = 'oauth2/callback';
        await processSignInRequest(route);
    } else {
        console.error('OAuth code not found');
    }
}

const processSignInRequest = async (route) => {
    try {
        // Send the code to the backend using a POST request
        const response = await fetch(`${BASE_API_URL}/${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: oauthCode }),
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
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
}

document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('log_out_user')) {
        handleLogout();
    }


    if (event.target.classList.contains('log_in')) {
        login_btn.removeEventListener('click', handleRegistration)
        login_btn.addEventListener('click', handleLogin)

        // close cta when login button is pressed
        if (window.location.hash === "#home") {
            document.querySelector('.mobile-form').classList.remove('reveal');
            callToActionForm.classList.remove("reveal");
        }
    }

    if (event.target.classList.contains('sign_up')) {
        login_btn.removeEventListener('click', handleLogin)
        login_btn.addEventListener('click', handleRegistration)

        // close cta when signup button is pressed
        if (window.location.hash === "#home") {
            document.querySelector('.mobile-form').classList.remove('reveal');
            callToActionForm.classList.remove("reveal");
        }
    }

    if (event.target.classList.contains('dashbtn')) {
        const data = state.userEmail;
        renderDashboard();
        renderUserDetails(data);
        renderUserDetailsNav(data);
        // renderAnnouncement();
        navigateTo('dashboard');

        // close cta when user navigates to dashboard
        document.querySelector('.mobile-form').classList.remove('reveal');
        callToActionForm.classList.remove("reveal");
    }
});


if (userLog) {
    state.userEmail = userLog.userEmail;
    state.isLoggedIn = userLog.isLoggedIn;
    navBarUpdate();
} else {
    navBarUpdate();
}


