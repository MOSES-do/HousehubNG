import { BASE_API_URL, submit_email } from "../src/common.js"



async function handlePasswordReset() {
    //Submit email for password reset notification
    const email = submit_email.value;

    try {
        const response = await fetch(`${BASE_API_URL}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        console.log(response)
        if (response.ok) {
            alert("Password reset email sent successfully");
            window.location.href = 'index.html';
        } else {
            const errorData = await response.json();
            alert('Mail not sent: ' + errorData.error)
        }
    } catch (error) {
        console.log("Unable to send email: " + error)
    }
}
document.getElementById('forgot-password').addEventListener('submit', function (e) {
    e.preventDefault();
    handlePasswordReset();
})