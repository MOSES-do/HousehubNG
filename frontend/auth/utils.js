// 'use strict'
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