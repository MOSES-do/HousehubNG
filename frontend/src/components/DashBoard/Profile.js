import { profile } from "../../common.js";



const renderProfile = () => {
    profile.innerHTML = '';
    const ProfileData = `we got this profile`
    profile.insertAdjacentHTML('afterbegin', ProfileData);
}

export default renderProfile;