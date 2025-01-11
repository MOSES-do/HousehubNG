// import { alert } from "../../common.js";

window.addEventListener('DOMContentLoaded', async () => {
    const listPage = window.location.hash;
    // On page refresh/open a new tab
    if (listPage === "#dashboard") {
        renderAnnouncement()
    }
});
export const renderAnnouncement = () => {
    // alert.innerHTML = '';
    const Announce = `
            <div> Announcements Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ipsam dolor labore
                porro
                tempore dicta eius minima! Similique, at consequuntur!!</div>
   `
    // alert.insertAdjacentHTML("afterbegin", Announce)
}
