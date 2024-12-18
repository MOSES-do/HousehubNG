import { BASE_API_URL, submit_email } from "../src/common.js"



async function handlePasswordReset() {
    //Submit email for noification
    mail_address = submit_email.value;
    console.log(mail_address)
    try {
        const response = await fetch(`${BASE_API_URL}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mail_address })
        });
        console.log(response)
        if (response.ok) {
            alert("Email sent successfully");
        } else {
            const errorData = await response.json();
            alert('Mail not sent: ' + errorData.error)
        }
    } catch (error) {
        console.log("Unable to send email: " + error)
    }
}
document.querySelector('.sub_mail').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Hola")
    handlePasswordReset
})