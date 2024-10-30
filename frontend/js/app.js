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



const url = 'https://aceme.tech/api/v1';

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
        console.log("Registration failed")
    }
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


document.querySelector('.g-auth').addEventListener('click', function () {
    fetch(`${url}/login/google`)
        .then(response => response.json())
        .then(data => {
            window.location.href = data.authorization_url;
        });
});

window.onload = (() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    // console.log(code)
    if (code) {
        // Send the authorization code to the server
        const handleToken = async () => {
            try {
                const response = await fetch(`${url}/token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ code: code })
                });
                if (response.ok) {
                    const data = await response.json();
                    // console.log(data)
                    localStorage.setItem('token', data.token);

                    window.location.href = 'listings.html';
                } else {
                    const errorData = await response.json();
                    alert('Login failed: ' + errorData.error)
                    console.error('Error: Token not received');
                };
            } catch (error) {
                console.error('Error:', error)
            }
        }
        handleToken();
    }
})();


