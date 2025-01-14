'use strict'
import { state } from "../src/common.js";

// const article = document.getElementById('article');
const rightFooter = document.getElementById('rightFooter');


const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !state.hasMore) {
            console.log('Placeholder is in view, revealing hidden element!');
            rightFooter.classList.add('show');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, { threshold: 0 });
const placeholder = document.querySelector('.placeholder');
observer.observe(placeholder);


// On oauth redirection login strip href of er'tin befofe the hash
export function oauthUrlRedirectCleanUp(keyword) {
    const baseUrl = `https://househubng.netlify.app/#${keyword}`
    const url = new URL(window.location.href);
    const hasQueryParams = url.search.length > 0; // Check if there are query parameters
    const hashMatches = url.hash.slice(1) === keyword;

    if (hasQueryParams && hashMatches) {
        history.replaceState(null, '', baseUrl);
    }
    return false; // Return false if no match is found
}


export function generalUrlRedirectCleanUp(keyword) {
    const baseUrl = `https://househubng.netlify.app/${keyword}`;
    const url = new URL(window.location.href);

    const hasNoQueryParams = url.search.length === 0;
    const hasHtml = url.pathname.includes('.html');

    if (hasHtml && hasNoQueryParams) {
        history.replaceState(null, '', baseUrl);
        return true;
    }
    return false;
}


// remove .html from url object
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    generalUrlRedirectCleanUp(hash);
})







