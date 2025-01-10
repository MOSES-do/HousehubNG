import { profile, state } from "../../common.js";
import { renderUserDetails } from "./UserInfo.js";



const renderProfile = () => {
    const data = state.userEmail;
    renderUserDetails(data);

    profile.innerHTML = '';
    const ProfileData = `we got this profile`
    profile.insertAdjacentHTML('afterbegin', ProfileData);
}

export default renderProfile;