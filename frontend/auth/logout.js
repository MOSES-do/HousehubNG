'use strict'
import { BASE_API_URL } from "../src/common.js"

// using JWT for logout validation
async function handleLogout() {
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
            localStorage.removeItem('userEmail');
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

