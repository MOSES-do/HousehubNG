import { subscription, state } from "../../common.js";
import { renderUserDetails } from "./UserInfo.js";



const renderSubscription = () => {
    const data = state.userEmail;
    renderUserDetails(data);
    subscription.innerHTML = '';
    const SubscriptionData = `we got this subscription`
    subscription.insertAdjacentHTML('afterbegin', SubscriptionData);
}

export default renderSubscription;