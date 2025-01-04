'use strict'
import { BASE_API_URL } from "../src/common.js"

// using JWT for logout validation
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
            window.location.href = 'index.html';
        } else {
            const errorData = await response.json();
            console.error('Logout failed: ' + errorData.error);
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error:', error);
        console.error('Logout failed: ' + errorData.error);
    }
}

