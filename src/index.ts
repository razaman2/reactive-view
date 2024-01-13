import {formatInTimeZone} from "date-fns-tz";
import {ComponentPublicInstance, UnwrapRef} from "vue";
import Subscriptions from "./Subscriptions";
import ReactiveView, {setup} from "./ReactiveView";
import AsyncComponent from "./AsyncComponent";

export default ReactiveView;
export {setup, AsyncComponent};

/**
 * uppercase the first character of each word in the input string.
 * @description
 * (test -> Test), (TEST -> Test), (test test -> Test Test)
 */
export function ucf(string: string) {
    return string.split(/\s+/).map((string) => {
        return string.toLowerCase().replace(/^(\w)/, ($1) => $1.toUpperCase());
    }).join(" ");
}

/**
 * uppercase the first character of each word that follows a specified token
 * @description
 * (test-test -> test-Test), (TEST-TEST -> TEST-Test), (test/test -> test/Test)
 */
export function ucfat(string: string, tokens: Array<string>) {
    const pattern = RegExp(`(?<=(?:${tokens.join("|")}))(\\w)(\\w*)`, "g");
    return string.replace(pattern, ($1, $2, $3) => `${$2.toUpperCase()}${$3.toLowerCase()}`);
}

export function safeRequest(request: {
    try: () => Promise<any> | any,
    catch?: ((error: any) => Promise<any> | any) | false,
    finally?: () => Promise<any> | any,
    complete?: () => Promise<any> | any,
    loading?: {status: boolean, message?: string},
    message?: string,
    alternative?: boolean,
}): Promise<any> {
    return new Promise(async (resolve) => {
        // cache loading message.
        const {message} = request.loading ?? {};

        if (request.loading) {
            request.loading.status = true;

            if (request.message) {
                request.loading.message = request.message;
            }
        }

        try {
            resolve(await request.try());
        } catch (e) {
            if (request.alternative ?? true) {
                resolve(request.catch ? await request.catch(e) : console.log(e));
            }
        } finally {
            await request.finally?.();

            // reset loading status to it's inactive state.
            if (request.loading) {
                request.loading.status = false;
            }

            // reset loading text to it's default value.
            if (request.loading && message) {
                request.loading.message = message;
            }

            await request.complete?.();
        }
    });
}

export function getRoot(vue: ComponentPublicInstance) {
    return ((typeof vue.$attrs.root === "function") ? vue.$attrs.root() : vue.$attrs.root) ?? vue.$root ?? vue.$parent?.$root;
}

type PropOptions = {
    exclude: string | Array<string>;
    include: Record<string, any>;
}

type PropExclusions = Array<string> | string

export function getProps(props: Record<string, any>, exclude: PropExclusions): Record<string, any>
export function getProps(props: Record<string, any>, options: PropOptions): Record<string, any>
export function getProps(props: Record<string, any>, param2: PropExclusions | PropOptions) {
    const exclude = (Array.isArray(param2) || (typeof param2 === "string")) ? param2 : param2.exclude;
    const exclusions = (Array.isArray(exclude) ? exclude : [exclude]).join("|");
    const include = (param2 as PropOptions).include ?? {};

    return Object.entries(include).reduce((props, [key, val]) => {
        props[key] = val;

        return props;
    }, Object.entries(props).reduce((props: Record<string, any>, [key, val]) => {
        if (!RegExp(`(^|\\|)${key}($|\\|)`, "i").test(exclusions)) {
            props[key] = val;
        }

        return props;
    }, {}));
}

export function getDate(timestamp: {toDate: () => Date} | Date, format?: string): string
export function getDate(timestamp: {toDate: () => Date} | Date, options?: {format?: string, timezone?: string}): string
export function getDate(param1: {toDate: () => Date} | Date, param2?: string | {format?: string, timezone?: string}) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const format = "MM/dd/yyyy h:mm a";

    const options = (typeof param2 === "string")
        ? {format: param2, timezone}
        : {format: param2?.format ?? format, timezone: (param2?.timezone ?? timezone)};

    const datetime = () => {
        try {
            return (param1 instanceof Date) ? param1 : param1.toDate();
        } catch (e) {
            return new Date();
        }
    };

    return formatInTimeZone(datetime(), options.timezone, options.format);
}

export function getRef(component: ComponentPublicInstance, ref: UnwrapRef<any>) {
    safeRequest({
        try: async () => (component.$props as Record<any, any>).ref.value = component,
        alternative: false,
    });

    return ref.value = component;
}

export function expose(vue: any, props: Record<string, any>) {
    Object.entries(Object.getOwnPropertyDescriptors(props)).forEach(([key, val]) => {
        Object.defineProperty(vue, key, val);
    });

    return props;
}

export function getSubscription() {
    const subscriptions: Array<any> = [];
    const subscription = Subscriptions.get();

    return {
        addSubscription(name: string, handler = () => false, data?: any) {
            subscription.subscribe(name, handler, data);
            subscriptions.push(() => subscription.unsubscribe(name));
        },

        replaceSubscription(name: string, handler = () => false, data?: any) {
            subscription.replace(name, handler, data);
            subscriptions.push(() => subscription.unsubscribe(name));
        },

        removeSubscriptions() {
            subscriptions.forEach((subscription) => safeRequest({
                try: () => subscription(),
            }));
        },

        removeSubscription(name: string) {
            subscription.unsubscribe(name);
        },

        hasSubscription(name: string) {
            return subscription.hasSubscription(name);
        },

        subscriptions,

        subscription,
    };
}

type Accessible = {
    parent: {
        self: Record<string | symbol, any>
    },
    self: Record<string | symbol, any>
    access?: Function
    value?: {
        parent: {
            self: Record<string | symbol, any>
        },
        self: Record<string | symbol, any>,
        access?: Function
    }
}

export function access<T extends ComponentPublicInstance & Accessible>($vue: T = {} as T) {
    const target = (typeof $vue.access === "function")
        ? $vue.access()
        : ($vue.value && (typeof $vue.value.access === "function") ? $vue.value.access() : $vue.value) ?? $vue ?? {};

    return new Proxy(target, {
        get(target, key) {
            const component = {$vue: target};

            do {
                if (component.$vue?.[key]) {
                    return component.$vue[key];
                } else if (component.$vue.self?.[key]) {
                    return component.$vue.self[key];
                } else {
                    component.$vue = component.$vue.parent;
                }
            } while (component.$vue);
        },
    });
}
