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

export default renderInitLoad;