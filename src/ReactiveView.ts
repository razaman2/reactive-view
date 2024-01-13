import ObjectManager from "@razaman2/object-manager";
import DataManager from "@razaman2/data-manager";
import {Collection} from "@razaman2/collection-proxy";
import type {DataClient} from "@razaman2/data-manager";
import type {ComponentPublicInstance, SetupContext} from "vue";
import {access, getSubscription} from "./index";
import {h, ref, watch, onBeforeUnmount} from "vue";
import {name, version} from "../package.json";
import {v4 as uuid} from "uuid";

export const props = {
    defaultData: {},
    getDefaultData: {
        type: Function,
        default: (data = {}) => data,
    },
    logging: {
        validator: (logging: unknown) => {
            return typeof logging === "boolean";
        },
    },
    model: {},
    modelName: {
        type: String,
        default: "ReactiveView",
    },
    notifications: {type: Object},
    root: {type: Function},
    state: {},
    subscriptions: {
        type: Object,
        default: getSubscription(),
    },
};

export const setup = {
    setup: {
        type: Function,
        default: (param1 = {}, param2 = {}) => {
            return Object.assign(param1, param2);
        },
    },
};

export default {
    props: {
        ...setup,
        ...props,
    },

    setup(props: Record<string, any>, context: SetupContext) {
        const template = (vue: ComponentPublicInstance, options: Record<string, any>) => {
            const vnode = context.slots.default
                ? h("div",
                    context.attrs,
                    context.slots.default({vue, options, props, context}),
                )
                : h("div", {
                    style: {
                        color: "red",
                        textAlign: "center",
                    },
                    ...context.attrs,
                }, `${props.modelName}: ${name}@${version}`);

            return context.slots.template?.({vue, vnode}) ?? vnode;
        };

        const isValid = ref(false);

        const defaultData = props.getDefaultData(
            Array.isArray(props.state)
                ? props.defaultData ?? []
                : props.defaultData ?? {},
        );

        const defaultType = Array.isArray(defaultData) ? [] : {};
        const stateRef = ref(DataManager.transform(props.state ?? defaultType));

        const config: DataClient = {
            defaultData,
            data: stateRef.value,
            name: props.modelName,
            logging: props.logging,
            notifications: props.notifications,
        };

        const getState: DataManager | Collection = (
            props.model
                ? typeof props.model === "function"
                    ? props.model(config)
                    : props.model
                : new DataManager(config)
        );

        const options = {
            parent: {self: props},
            self: {template, isValid, getState, stateRef},
        };

        const setup = props.setup(options) ?? options;
        const {parent = {}, self = {}, ...rest} = setup;

        let sync = false;

        if (context.attrs["onUpdate:modelState"]) {
            const config: {callback: Function, transform?: Function, options?: {}} = (typeof context.attrs["onUpdate:modelState"] === "function")
                ? {callback: context.attrs["onUpdate:modelState"]}
                : context.attrs["onUpdate:modelState"] as {callback: Function, transform?: Function, options?: {}};

            const subscriptionName = `\n${props.modelName}\nonUpdate:modelState\n${uuid()}`;

            const subscription = watch(() => ObjectManager.on(stateRef.value).clone(), (after: any, before: any) => {
                const transform = config.transform ?? access(setup).$transform;

                const diff = {
                    before: before?.hasOwnProperty("") ? before[""] : before,
                    after: after?.hasOwnProperty("") ? after[""] : after,
                };

                if (sync) {
                    sync = false;
                } else {
                    config.callback(transform ? transform(diff) : diff, getState);
                }
            }, config.options);

            props.subscriptions.addSubscription(subscriptionName, subscription);

            onBeforeUnmount(() => props.subscriptions.removeSubscription(subscriptionName, false));
        }

        if (context.attrs["onUpdate:propsState"]) {
            const config: {callback: Function, options?: {}} = (typeof context.attrs["onUpdate:propsState"] === "function")
                ? {callback: context.attrs["onUpdate:propsState"]}
                : context.attrs["onUpdate:propsState"] as {callback: Function, options?: {}};

            const subscriptionName = `\n${props.modelName}\nonUpdate:propsState\n${uuid()}`;

            const subscription = watch(() => props.state, (after: any, before: any) => {
                config.callback({before, after}, getState);
                sync = true;
            }, config.options);

            props.subscriptions.addSubscription(subscriptionName, subscription);

            onBeforeUnmount(() => props.subscriptions.removeSubscription(subscriptionName, false));
        }

        return ($vue: ComponentPublicInstance & any) => {
            const setup = {$vue, options: parent};

            while (setup.options) {
                Object.defineProperties(setup.$vue, Object.assign({
                    access: {
                        configurable: true,
                        value: () => {
                            return access({parent, self} as any);
                        },
                    },
                }, rest));

                setup.options = setup.options.parent;
                setup.$vue = setup.$vue.$parent;
            }

            return access($vue).template($vue, {parent, self});
        };
    },
};
