import { homeListEl } from "../common.js";
import houseListNavUpdate from "./HouseListForm.js";


const renderHouseList = (dataItems) => {
    houseListNavUpdate();
    const fragment = document.createDocumentFragment();
    dataItems.forEach(data => {
        const listItem = document.createElement('li');
        listItem.className = "product_box"
        listItem.innerHTML = `
            <figure class="recent-search--img">
                <div class="spinner spinner--search spinner--visible"></div>
                <img 
                    src="${data.apartment_pic}" 
                    alt="Apartment Picture" 
                    // onload="this.previousElementSibling.style.display = 'none'; this.style.display = 'block';"
                    onload="this.closest('.product_box').querySelector('.spinner').style.display = 'none';"
                    onerror="this.closest('.product_box').querySelector('.spinner').style.display = 'none';"
                    style="display: none;"
                />
            </figure>

            <div class="recent-search--products">
                <p class="price">₦${data.price}</p>
                <span><span class="qty"><em><b>${data.apartment_type}</b></em></span></span>
                <address>${data.address}</address>
                <p>${data.sales_exec}</p>
            </div>
        `;


        // Add fade-in effect for smooth appearance
        listItem.style.opacity = 0;
        listItem.style.transition = 'opacity 0.5s';
        fragment.appendChild(listItem);

        // Trigger the fade-in after appending to the fragment
        requestAnimationFrame(() => {
            listItem.style.opacity = 1;
        });
    })
    // Append all new items at once to reduce layout recalculations
    homeListEl.appendChild(fragment);
};

export default renderHouseList;


