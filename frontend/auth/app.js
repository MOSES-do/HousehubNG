'use strict';
import { BASE_API_URL, burger, burgerFirst, burgerSecond, burgerThird } from "../src/common.js"


burger.addEventListener("click", function (e) {
    burgerFirst.classList.toggle("line-1");
    burgerSecond.classList.toggle("line-2");
    burgerThird.classList.toggle("line-3");
});


// fetch(url).then((res) => {
//     return res.json();
// }).then(data => console.log(data)).catch((err) => console.log(err))

/**======SIGN UP, LOGIN========**/
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
            alert("User registered successfully");
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
            // conso
            // const tokenPayload = decodeJWT(data.token);

            window.location.href = 'listings.html';
        } else {
            const errorData = await response.json();
            alert('Login failed: ' + errorData.error)
        }
    } catch (error) {
        console.error('Error:', error)
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

// Google Auth
document.querySelector('.g-auth').addEventListener('click', function () {
    fetch(`${BASE_API_URL}/login/google`)
        .then(response => response.json())
        .then(data => {
            window.location.href = data.authorization_url;
            console.log(data.authorization_url)
        });
    // window.location.href = `${BASE_API_URL}/login/google`
});

window.addEventListener('load', () => {
    // check if we are on the callbak url
    if (window.location.href.includes('/oauth2/callback')) {
        handleOAuthCallback();
        console.log("The URL contains '/oauth2/callback'.");
    }
    else {
        console.log('no')
    }

    if (window.location.pathname === '/oauth2/callback') {
        console.log("The URL contains '/oauth2/callback'.");
    }
})

const handleOAuthCallback = async () => {
    console.log('Hola1')

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

                // Redirect the user to the desired page (e.g., dashboard)
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


// window.onload = (() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get('code');
//     // console.log(code)
//     if (code) {
//         // Send the authorization code to the server
//         const handleToken = async () => {
//             try {
//                 const response = await fetch(`${BASE_API_URL}/oauth2/callback`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ code: code })
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     // console.log(data)
//                     localStorage.setItem('token', data.token);

//                     window.location.href = 'listings.html';
//                 } else {
//                     const errorData = await response.json();
//                     alert('Login failed: ' + errorData.error)
//                     console.error('Error: Token not received');
//                 };
//             } catch (error) {
//                 console.error('Error:', error)
//             }
//         }
//         handleToken();
//     }
// })();
