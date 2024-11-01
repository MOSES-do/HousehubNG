import { spinnerSearchEl } from "../common.js";

const renderSpinner = (whichSpinner) => {
    const spinnerEl = whichSpinner === 'search' ? spinnerSearchEl : '';

    // spinnerEl.classList.toggle('spinner--visible');
}

export default renderSpinner;