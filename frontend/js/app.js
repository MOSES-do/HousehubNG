'use strict';

const burger = document.querySelector(".header_nav--hamburger");
const burgerFirst = document.querySelector(".hamburger--line:first-child");
const burgerSecond = document.querySelector(".hamburger--line:nth-child(2)");
const burgerThird = document.querySelector(".hamburger--line:last-child");

burger.addEventListener("click", function (e) {
    burgerFirst.classList.toggle("line-1");
    burgerSecond.classList.toggle("line-2");
    burgerThird.classList.toggle("line-3");
});



const url = 'http://aceme.tech/api/v1';
/**
 * ======endpoints=========
 * http://{url}/stats - GET
 * http://{url}/status - GET
 * http://{url}/registered_users - GET
 * http://{url}/reg_users/user_id - GET
 * http://{url}/register - POST
 * http://{url}/login - POST
 */

// fetch(url).then((res) => {
//     return res.json();
// }).then(data => console.log(data)).catch((err) => console.log(err))



/**======SIGN UP, LOGUN AND LOGOUT========**/
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

async function handleLogin() {
    //LOGIN FUNCTIONALITY
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pwd').value;
    try {
        const response = await fetch(`${url}/login`, {
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
            console.log(tokenPayload.sub)
            localStorage.setItem('userEmail', tokenPayload.sub.email);

            window.location.href = 'listings.html';
        } else {
            const errorData = await response.json();
            alert('Login failed: ' + errorData.error)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}


async function handleRegistration() {
    //Sign up FUNCTIONALITY
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pwd').value;
    try {
        const response = await fetch(`${url}/register`, {
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
        console.error('Error:', error)
        console.log("Registration failed")
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



async function handleLogout() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${url}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            localStorage.removeItem('token');
            alert('Logged out successfully!');
            window.location.href = 'index.html';
        } else {
            const errorData = await response.json();
            alert('Logout failed: ' + errorData.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Logout failed!');
    }
}


document.querySelector('.log_out_user').addEventListener('click', handleLogout)

