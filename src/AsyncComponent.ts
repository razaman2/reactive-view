import ReactiveView, {setup} from "./index";
import {h, ref, watch, isRef, isReactive, onMounted} from "vue";

export default {
    props: {
        ...setup,
        resolve: {
            required: true,
        },
        delay: {
            type: Number,
            default: 200,
        },
        timeout: {
            type: Number,
            default: 2000,
        },
        loading: {
            default: h("div"),
        },
        options: {
            type: Object,
        },
        error: {
            required: false,
        },
    },

    setup() {
        return ($vue: any) => {
            return h(ReactiveView, {
                    setup: (parent: any) => {
                        const componentRef = ref($vue.loading);

                        const template = () => {
                            const vnode = componentRef.value;

                            return $vue.$slots.template?.({$vue, vnode}) ?? vnode;
                        };

                        const self = {template};

                        onMounted(async () => {
                            try {
                                if ($vue.resolve) {
                                    const target = await $vue.resolve;

                                    target.hasOwnProperty("property") ?
                                        watch((isRef(target.property) || isReactive(target.property)) ? target.property : async () => (await $vue.resolve).property, (after, before) => {
                                            setTimeout(async () => {
                                                return componentRef.value = await target.onChange({before: await before, after: await after});
                                            }, $vue.delay);
                                        }, $vue.options) :
                                        setTimeout(async () => {
                                            return componentRef.value = target;
                                        }, $vue.delay);
                                }
                            } catch (error) {
                                if ($vue.error) {
                                    componentRef.value = h(await $vue.error, {error});
                                }
                            }
                        });

                        return {parent, self};
                    },
                },
            );
        };
    },
};
