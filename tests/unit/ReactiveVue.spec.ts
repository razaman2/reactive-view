import {describe, it, expect} from "vitest";

describe("Reactive Vue", () => {
    //     it('should render default component', () => {
    //         const component = mount(ReactiveView);
    //
    //         expect(component.text()).toMatch(/template not provided!/i);
    //     });
    //
    //     it('should render default component as p tag with content', () => {
    //         const component = mount(ReactiveView);
    //
    //         expect(component.find("p").text()).toMatch(/template not provided!/i);
    //     });
    //
    //     it('should render default component as p tag with red text', () => {
    //         const component = mount(ReactiveView);
    //
    //         expect(component.find('p').attributes('style')).toMatch(/color: red;/);
    //     });
    //
    //     it('should allow creating renderless components', () => {
    //         const component = mount(ReactiveView, {
    //             props: {
    //                 renderless: true
    //             }
    //         });
    //
    //         expect(component.find('div').attributes()).toHaveProperty('hidden');
    //     });
    //
    //     it('should allow setting reactive vue data from state prop', () => {
    //         const component = mount(ReactiveView, {
    //             props: {
    //                 logging: false,
    //                 state: {
    //                     firstName: 'john',
    //                     lastName: 'doe'
    //                 }
    //             }
    //         });
    //
    //         expect(component.vm.getState().getData()).toEqual({
    //             lastName: 'doe',
    //             firstName: 'john'
    //         });
    //     });
    //
    //     it('should allow setting component name to class name', () => {
    //         const component = mount(ReactiveView);
    //
    //         expect(component.vm.name).toBe('ReactiveView');
    //     });
    //
    //     it('should toggle loading status when running safe-request()', () => {
    //         const component = mount(LoadingStatusComponent);
    //
    //         return component.vm.safeRequest({
    //             try: () => {
    //                 component.vm.$nextTick(() => {
    //                     expect(component.find('div').isVisible()).toBe(true);
    //                     expect(component.find('p').text()).toMatch(/please wait/i);
    //                 });
    //             },
    //             complete: () => {
    //                 component.vm.$nextTick(() => {
    //                     expect(component.find('div').isVisible()).toBe(false);
    //                 });
    //             }
    //         });
    //     });
    //
    //     it('should allow custom loading text when running safe-request', () => {
    //         const component = mount(LoadingStatusComponent);
    //
    //         return component.vm.safeRequest({
    //             try: () => {
    //                 component.vm.$nextTick(() => {
    //                     expect(component.find('p').text()).toMatch(/custom message/i);
    //                 });
    //             },
    //             complete: () => {
    //                 component.vm.$nextTick(() => {
    //                     expect(component.find('p').text()).toMatch(/please wait/i);
    //                 });
    //             },
    //             message: 'custom message'
    //         })
    //     });
    //
    //     it('should allow custom loading status when running safe-request', () => {
    //         const component = mount(CustomLoadingStatusComponent);
    //
    //         component.vm.safeRequest({
    //             try: () => {
    //                 component.vm.$nextTick(() => {
    //                     expect(component.find('div').isVisible()).toBe(true);
    //                 });
    //             },
    //             complete: () => {
    //                 component.vm.$nextTick(() => {
    //                     expect(component.find('div').isVisible()).toBe(false);
    //                 });
    //             },
    //             loading: component.vm.customLoadingStatus
    //         })
    //     });
    //
    //     it('should render data from component state', () => {
    //         const component = mount(Component1, {
    //             props: {
    //                 logging: false
    //             }
    //         });
    //
    //         expect(component.find('p').text()).toBe('john doe');
    //
    //         component.vm.getState().setData({name: 'jane doe'});
    //
    //         component.vm.$nextTick(() => {
    //             expect(component.find('p').text()).toBe('jane doe');
    //         });
    //     });
    //
    //     it('should set child component state to the parent component state', () => {
    //         const component = mount(SwapComponentState, {
    //             props: {
    //                 logging: false
    //             }
    //         });
    //
    //         expect(component.find('p').text()).toBe('benjamin franklin');
    //     });
    //
    //     it('should reset component data to the provided default data', () => {
    //         const component = mount(Component1, {
    //             props: {
    //                 logging: false
    //             }
    //         });
    //
    //         expect(component.find('p').text()).toBe('john doe');
    //
    //         component.vm.getState().setData({name: 'jane doe'});
    //
    //         component.vm.$nextTick(() => {
    //             expect(component.find('p').text()).toBe('jane doe');
    //
    //             component.vm.getState().replaceData();
    //
    //             component.vm.$nextTick(() => {
    //                 expect(component.find('p').text()).toBe('john doe');
    //             })
    //         });
    //     });
    //
    //     it('should render component when prop data changes', async () => {
    //         const state = {
    //             value: {
    //                 color: 'red'
    //             }
    //         };
    //
    //         const component = mount(Component2, {
    //             props: {
    //                 logging: false,
    //                 state: state.value
    //             }
    //         });
    //
    //         await component.vm.$nextTick(() => {
    //             expect(component.find('p').text()).toBe('red');
    //         });
    //
    //         await component.setProps({state: {color: 'green'}});
    //
    //         await component.vm.$nextTick(() => {
    //             expect(component.find('p').text()).toBe('green');
    //         });
    //     });
    //
    //     it('data managers can be passed to components through props', () => {
    //         const data = new DataManager({data: {name: 'custom data'}});
    //
    //         const component = mount(Component1, {
    //             props: {
    //                 logging: false,
    //                 state: () => data
    //             }
    //         });
    //
    //         expect(component.vm.getState().getData('name')).toBe('custom data');
    //
    //         component.vm.getState().setData({name: 'updated data'});
    //
    //         expect(component.vm.getState().getData('name')).toBe('updated data');
    //     });
    // });
    //
    // class Component1 extends ReactiveView {
    //     template() {
    //         return h('p', this.getState().getData('name'));
    //     }
    //
    //     getDefaultData() {
    //         return {
    //             name: 'john doe'
    //         }
    //     }
    // }
    //
    // class Component2 extends ReactiveView {
    //     template() {
    //         return h('p', this.getState().getData('color'));
    //     }
    // }
    //
    // class LoadingStatusComponent extends ReactiveView {
    //     template() {
    //         return h('div', {
    //             hidden: !this.loadingStatus()
    //         }, [
    //             h('p', this.loadingText())
    //         ]);
    //     }
    // }
    //
    // class CustomLoadingStatusComponent extends ReactiveView {
    //     customLoadingStatus = {status: false};
    //
    //     template() {
    //         return h('div', {
    //             hidden: !this.customLoadingStatus.status
    //         });
    //     }
    // }
    //
    // class SwapComponentState extends ReactiveView {
    //     template() {
    //         return h(Component1, {
    //             model: this
    //         })
    //     }
    //
    //     getDefaultData(): { [p: string]: any } {
    //         return {
    //             name: 'benjamin franklin'
    //         }
    //     }
});
