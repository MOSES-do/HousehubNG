import { subscription } from "../../common.js";


const renderSubscription = () => {
    subscription.innerHTML = '';
    const SubscriptionData = `we got this subscription`
    subscription.insertAdjacentHTML('afterbegin', SubscriptionData);
}
export default renderSubscription;