import { handleRegistration, handleLogin } from "../../auth/app.js";
import { callToActionForm, login_btn } from "../common.js";
import { toggleSignUpForm } from "../../auth/call_to_action.js";
import { state } from "../common.js";
import navigateTo from "./Router.js";
import renderDashboard from "./Dashboard.js";
import { handleLogout } from "../../auth/logout.js";


callToActionForm.addEventListener('click', function (e) {
    e.preventDefault();
    //Matching strategy
    console.log('calltoaction form')
    if (e.target.classList.contains('log_in')) {
        login_btn.removeEventListener('click', handleRegistration)
        login_btn.addEventListener('click', handleLogin)
    }
    if (e.target.classList.contains('sign_up')) {
        login_btn.removeEventListener('click', handleLogin)
        login_btn.addEventListener('click', handleRegistration)
    }
});

function navBarUpdate(isLoggedIn = state.isLoggedIn) {
    callToActionForm.innerHTML = '';
    const userEmail = state.userEmail;
    if (isLoggedIn && userEmail) {
        const LogDashBoard = `
            <button class="btn log_in log_out_user">Log OUT</button>
            <button class="btn dashbtn">Dashboard</button>
            `
        callToActionForm.innerHTML = LogDashBoard;
        document.querySelector('.dashbtn').addEventListener('click', () => {
            renderDashboard();
            navigateTo('dashboard');
        });
        document.querySelector('.log_out_user').addEventListener('click', handleLogout);
    } else {
        const NoLogDashBoard = `
                <button class="btn log_in btn-up">Log in</button>
                <button class="btn btn-up sign_up ">Sign up</button>
            `
        callToActionForm.innerHTML = NoLogDashBoard;

        // event listeners must be re-attached to dynamically added elements
        document.querySelector('.sign_up').addEventListener('click', toggleSignUpForm);
        document.querySelector('.btn-up').addEventListener('click', toggleSignUpForm);
    }

}
export default navBarUpdate;


