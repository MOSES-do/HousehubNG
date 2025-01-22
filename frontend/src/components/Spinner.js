import { spinnerInitialSearchEl, scroll_loaderEl } from "../common.js";

const renderInitLoad = (whichSpinner = 'stop') => {
    if (whichSpinner === 'spinner--initial_search') {
        spinnerInitialSearchEl.classList.add('spinner--visible');
    } else if (whichSpinner === 'stop') {
        spinnerInitialSearchEl.classList.remove('spinner--visible');
    }
}

export const renderScrollLoader = (whichSpinner = '') => {
    if (whichSpinner === 'morecontent_loading') {
        scroll_loaderEl.classList.add('spinner--visible');
    } else if (whichSpinner === 'stop') {
        scroll_loaderEl.classList.remove('spinner--visible');
    }
}

export const apartmentSearchLoader = (whichSpinner = '') => {
    if (whichSpinner === 'apartment_search') {
        document.querySelector('.search-btn a').style.visibility = 'hidden';
        document.querySelector('.search_loader').classList.add('spinner--visible');
    } else if (whichSpinner === 'stop') {
        document.querySelector('.search-btn a').style.visibility = 'visible';
        document.querySelector('.search_loader').classList.remove('spinner--visible');
    }
}

export const signinFormLoader = (whichSpinner = '') => {
    if (whichSpinner === 'sign_log_in') {
        document.querySelector('.submit_req').style.visibility = 'hidden';
        document.querySelector('.submit_loader').classList.add('spinner--visible')
    } else if (whichSpinner === 'stop') {
        document.querySelector('.submit_req').style.visibility = 'visible';
        document.querySelector('.submit_loader').classList.remove('spinner--visible')
    }
}

export default renderInitLoad;