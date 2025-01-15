import { callToActionForm } from "../common.js";
import { toggleSignUpForm } from "../../auth/call_to_action.js";
import { state } from "../common.js";

function navBarUpdate(isLoggedIn = state.isLoggedIn) {
    const userEmail = state.userEmail;
    if (isLoggedIn && userEmail) {
        callToActionForm.innerHTML = '';
        const LogDashBoard = `
            <button class="btn log_out_user">Log OUT</button>
            <button class="btn btn-dash dashbtn">Dashboard</button>
            `
        callToActionForm.innerHTML = LogDashBoard;
    } else {
        const NoLogDashBoard = `
                <button class="btn log_in btn-up">Log in</button>
                <button class="btn btn-up sign_up ">Sign up</button>
            `
        callToActionForm.innerHTML = NoLogDashBoard;

        // event listeners must be re-attached to dynamically created elements     
        document.querySelector('.sign_up').addEventListener('click', toggleSignUpForm);
        document.querySelector('.log_in').addEventListener('click', toggleSignUpForm);
    }

}


export default navBarUpdate;
