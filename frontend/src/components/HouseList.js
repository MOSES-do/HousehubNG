import { state, homeListEl } from "../common.js";
// console.log(homeList)
const renderHouseList = () => {
    homeListEl.innerHTML = '';
    const dataItems = state.searchHouseItems;
    dataItems.map(data => {
        const newHouseItem = `
        <li>
            <figure class="recent-search--img">
                <img src="${data.apartment_pic}" alt="picture1" />
            </figure>

            <div class="recent-search--products">
                <p class="price">₦${data.price}</p>
                <span><span class="qty"><em><b>${data.apartment_type}</b></em></span></span>
                <address>${data.address}</address>
                <p>${data.sales_exec}</p>
            </div>
        </li>
        `
        homeListEl.insertAdjacentHTML('beforeend', newHouseItem);
    })

}

export default renderHouseList;


