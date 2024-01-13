import Subscription from "./Subscription";

export default class Subscriptions extends Subscription {
    protected static subscriptions = Subscriptions.create();

    public static get() {
        return this.subscriptions;
    }
}
