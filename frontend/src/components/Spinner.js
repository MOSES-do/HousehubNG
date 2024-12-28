import { spinnerSearchEl } from "../common.js";

const renderSpinner = (whichSpinner = '') => {
    if (whichSpinner === 'search') {
        spinnerSearchEl.classList.add('spinner--visible');
    } else {
        spinnerSearchEl.classList.remove('spinner--visible');
    }

}

export default renderSpinner;