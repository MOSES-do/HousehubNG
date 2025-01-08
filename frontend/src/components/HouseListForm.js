import { toggleSignUpForm } from "../../auth/call_to_action.js";
import { state } from "../common.js";

function houseListNavUpdate() {
    const userEmail = state.userEmail;

    const nav = document.querySelector('.nav-container.product_list');
    nav.innerHTML = "";
    nav.innerHTML = `
          <nav class="header_nav">
                    <figure class="logo">
                        <a href="index.html">
                            <span><img class="icon" src="/assets/logo.png" alt="logo-icon"></span>
                            <span><img class="icon-text" src="/assets/icon-1.png" alt="logo-text"></span>
                        </a>
                    </figure>

                    <div class="header_nav--hamburger">
                        <div class="hamburger--line"></div>
                        <div class="hamburger--line"></div>
                        <div class="hamburger--line"></div>
                    </div>

                    <ul class="header__nav--links row">
                        <li><a href="#" class="header__nav--links__link" role="tab" id="tab1">Buy</a>
                        </li>
                        <li><a href="#" class="header__nav--links__link" role="tab" id="tab2">Rent</a>
                        </li>
                        <li><a href="#" class="header__nav--links__link" role="tab" id="tab3">Sell</a>
                        </li>
                        <li><a href="#" class="header__nav--links__link" role="tab" id="tab4">News & Insights</a>
                        </li>
                    </ul>
                    <span class="bg-user">
                        <svg data-testid="icon-user" class="menu-user" viewBox="0 0 24 24"
                            style="display: inline-block; width: 1em; height: 1em; font-size: 24px; fill: #d72228;"
                            role="img" aria-label="User avatar" focusable="false">
                            <path fill-rule="evenodd"
                                d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM9 7a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3 6c-4.231 0-7.173 1.699-8.393 4.689-.476 1.169-.148 2.302.56 3.089C4.855 21.54 5.903 22 7 22h10c1.098 0 2.146-.46 2.832-1.222.709-.787 1.037-1.92.56-3.09C19.173 14.699 16.232 13 12 13Zm-6.54 5.444C6.282 16.424 8.32 15 12 15s5.717 1.423 6.54 3.444c.15.365.073.7-.194.995-.289.321-.787.561-1.346.561H7c-.56 0-1.057-.24-1.346-.56-.267-.297-.343-.631-.195-.996Z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </span>
                    <div class="log_user1">
                        <!--<button class="btn log_in  log_out_user">Log OUT</button>
                        <button class="btn dashbtn">Dashboard</button>--!>
                    </div>
                        </nav>
                        `
    const logUser = document.querySelector('.log_user1');


    if (state.isLoggedIn && userEmail) {
        logUser.innerHTML = `
            <button class="btn log_out_user">Log OUT</button>
            <button class="btn btn-dash dashbtn">Dashboard</button>
        `
    } else {
        logUser.innerHTML = `
         <button class="btn log_in log btn-up">Log in</button>
         <button class="btn btn-up sign sign_up ">Sign up</button>
        `
        // event listeners must be re-attached to dynamically added elements 
        document.querySelector('.sign').addEventListener('click', toggleSignUpForm);
        document.querySelector('.log').addEventListener('click', toggleSignUpForm);
    }
}

export default houseListNavUpdate;


