'use strict';
import { BASE_API_URL } from "../src/common.js"
import renderListings from "../src/components/Listings.js";



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

async function handleRegistration() {
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

async function handleLogin() {
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

            if (tokenPayload.sub.verified === true) {
                const token = localStorage.getItem('token');
                fetchProtectedContent(token)
                window.location.href = 'listings.html';
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

async function fetchProtectedContent(token) {
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
            state.userEmail = data;
            renderListings();
        } else {
            alert('Failed to fetch protected content');
        }
    } catch (e) {
        console.error('Error:', error);
        alert('Failed to fetch protected content');
    }
}

const submitBtn = document.querySelector('.login-btn');
document.querySelector('.log_user').addEventListener('click', function (e) {
    e.preventDefault();
    //Matching strategy
    if (e.target.classList.contains('log_in')) {
        submitBtn.removeEventListener('click', handleRegistration)
        submitBtn.addEventListener('click', handleLogin)
    }
    if (e.target.classList.contains('sign_up')) {
        submitBtn.removeEventListener('click', handleLogin)
        submitBtn.addEventListener('click', handleRegistration)
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
        our redirect_uri simply points to the back homepgae of the website 
     * if (window.location.href.includes('/oauth2/callback')) {
         handleOAuthCallback();
        }
     */
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

                window.location.href = data.redirect_url;
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
