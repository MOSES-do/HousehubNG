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
import { signinFormLoader } from "../src/components/Spinner.js";
import renderError from "../src/components/Error.js";

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
    signinFormLoader('sign_log_in');

    try {
        const response = await fetch(`${BASE_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            renderError('Email verification link has been sent to your mail')
            signinFormLoader('stop');
        } else {
            const errorData = await response.json();
            renderError('Registration failed: ' + errorData.error)
        }
    } catch (error) {
        console.log("Registration failed")
    } finally {
        signinFormLoader('stop');
    }
}

export async function handleLogin() {
    //LOGIN FUNCTIONALITY
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pwd').value;
    signinFormLoader('sign_log_in');
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

            if (tokenPayload.sub.verified === true) {
                const token = localStorage.getItem('token');
                fetchProtectedContent(token)
            } else {
                renderError('To log in, complete email verification');
                signinFormLoader('stop');
            }

        } else {
            const errorData = await response.json();
            renderError('Login failed: ' + errorData.error)
            console.log('Login failed: ' + errorData.error)
            // alert('Login failed: ' + errorData.error)
            return errorData;
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
            // alert('Failed to fetch protected content');
            console.log('Failed to fetch protected content');
        }
    } catch (e) {
        console.error('Error:', error);
        // renderError('Failed to fetch protected content');
        // alert('Failed to fetch protected content');
    }
}

//==================================== GO0gle Auth ========================================//
let oauthFlow = false;
document.querySelector('.g-auth').addEventListener('click', function () {
    fetch(`${BASE_API_URL}/login/google`)
        .then(response => response.json())
        .then(data => {
            window.location.href = data.authorization_url;
        });
});

window.addEventListener('load', () => {
    // Automatically prompt user authentication on page load
    google.accounts.id.initialize({
        client_id: "119453756942-20vc1f6u1fdi4bdv0upidob2s14am44q.apps.googleusercontent.com",
        callback: async (response) => {
            if (response.credential) {
                const route = 'google-signin';
                await processSignInRequest(route, response.credential);
            }
        }
    })
    /**
        check if url path includes callback route
        No longer required since login is on the homepage of the website,
        our redirect_uri simply points to the back homepage of the website 
        if (window.location.href.includes('/oauth2/callback')) {
        }
    */

    const urlParams = new URLSearchParams(window.location.search);
    const oauthCode = urlParams.get('code');
    if (oauthCode) {
        oauthFlow = true;
        handleOAuthCallback(oauthCode);
    }

    // Allow prompt on page load only when user is not already logged in 
    if (window.location.hash === '#home' && !state.isLoggedIn && !oauthFlow)
        google.accounts.id.prompt();

})

const handleOAuthCallback = async (oauthCode) => {
    if (oauthCode) {
        const route = 'oauth2/callback';
        await processSignInRequest(route, oauthCode);
    } else {
        console.error('OAuth code not found');
    }
}

const processSignInRequest = async (route, cred = "") => {
    try {
        // Send the code to the backend using a POST request
        const response = await fetch(`${BASE_API_URL}/${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: cred }),
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
}

document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('log_out_user')) {
        signinFormLoader('stop');
        handleLogout();
    }

    if (event.target.classList.contains('log_in')) {
        signinFormLoader('stop');
        login_btn.removeEventListener('click', handleRegistration);
        login_btn.addEventListener('click', handleLogin);

        // close cta when login button is pressed
        if (window.location.hash === "#home") {
            document.querySelector('.mobile-form').classList.remove('reveal');
            callToActionForm.classList.remove("reveal");
        }
    }

    if (event.target.classList.contains('sign_up')) {
        signinFormLoader('stop');
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
    // On page load set state with local storage
    state.userEmail = userLog.userEmail;
    state.isLoggedIn = userLog.isLoggedIn;
    navBarUpdate();
} else {
    navBarUpdate();
}


