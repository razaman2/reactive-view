type SubscriptionItem = {
    name: string;
    handler: Function;
    data?: any;
}

export default class Subscription {
    private subscriptions: Array<SubscriptionItem> = [];
    private data: Record<string, any> = {};

    public static create(): Subscription {
        return new Subscription();
    }

    public subscribe(name: string, handler: Function, data?: any): Subscription {
        if (this.isNameAvailable(name)) {
            this.subscriptions.push({
                name,
                handler,
            });

            this.data[name] = data;
        }

        return this;
    }

    public replace(name: string, handler: Function, data?: any): Subscription {
        this.unsubscribe(name);

        return this.subscribe(name, handler, data);
    }

    public unsubscribe(subscription?: string): Subscription;
    public unsubscribe(subscriptions?: Array<string>): Subscription;
    public unsubscribe(subscriptions?: string | Array<string>) {
        if (!Array.isArray(subscriptions)) {
            subscriptions = subscriptions ? [subscriptions] : [];
        }

        if (subscriptions.length) {
            subscriptions.forEach((name) => {
                const subscription = this.find(name);

                if (subscription) {
                    subscription.handler();
                    this.remove(subscription);
                    console.log(`%cUnsubscribed From Subscription (${name})`, "background-color: yellow; color: green; font-weight: bold; padding: 3px;");
                }
            });
        } else {
            this.subscriptions.forEach((subscription) => {
                subscription.handler();
                console.log(`%cUnsubscribed From Subscription (${subscription.name})`, "background-color: yellow; color: red; font-weight: bold; padding: 3px;");
            });

            this.subscriptions = [];
        }

        return this;
    }

    public size(): number {
        return this.subscriptions.length;
    }

    public hasSubscription(name: string): boolean {
        return Boolean(this.find(name));
    }

    private remove(subscription: SubscriptionItem): void {
        this.subscriptions.splice(this.subscriptions.indexOf(subscription), 1);
    }

    private find(name: string): SubscriptionItem | undefined {
        return this.subscriptions.find((subscription) => {
            return (subscription.name === name);
        });
    }

    private isNameAvailable(name: string): boolean {
        if (this.hasSubscription(name)) {
            throw new Error(`There is already a subscription called "${name}".`);
        } else {
            return true;
        }
    }

    public registrations(): Array<SubscriptionItem> {
        return this.subscriptions;
    }

    public get(name: string): SubscriptionItem {
        const subscription = this.find(name);

        if (subscription) {
            return subscription;
        } else {
            throw new Error(`Subscription "${name}" doesn't exist!`);
        }
    }
}
