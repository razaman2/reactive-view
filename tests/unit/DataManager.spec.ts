import {describe, it, expect} from "vitest";

describe("Data Manager", () => {
    // it("should replace array prop data with new value", () => {
    //     const data = new DataManager({
    //         logging: true,
    //         getIgnoredKeys(keys: Array<string>) {
    //             return keys.concat(["roles"]);
    //         },
    //     });
    //
    //     data.setData({roles: ["super", "supervisor"]});
    //
    //     // expect(data.getData()).toEqual({roles: ['super', 'supervisor']});
    //
    //     data.setData({roles: ["admin"]});
    //
    //     // expect(data.getData('roles')).toEqual(['admin']);
    // });

    // it("should manage items", () => {
    //     const data = new DataManager({
    //         logging: true,
    //         // getIgnoredKeys(keys: Array<string>) {
    //         //     return keys.concat(['roles']);
    //         // }
    //     });
    //
    //     // data.setData({
    //     //     createdAt: {
    //     //         minutes: 1,
    //     //         seconds: 2,
    //     //         toDate() {
    //     //
    //     //         }
    //     //     }
    //     // });
    //
    //     data.setData({
    //         items: [
    //             {
    //                 createdAt: {
    //                     minutes: 1,
    //                     seconds: 2,
    //                     toDate: () => {
    //                     },
    //                 },
    //             },
    //             {
    //                 createdAt: {
    //                     minutes: 1,
    //                     seconds: 2,
    //                     toDate: () => {
    //                     },
    //                 },
    //             },
    //         ],
    //     });
    //
    //     console.log("logged data:", data.getData());
    // });
    //
    // it("should initialize object with data from the data prop", () => {
    //     const data1 = new DataManager({
    //         data: () => ({name: "John Doe"}),
    //     });
    //
    //     expect(data1.getData()).toEqual({name: "John Doe"});
    //
    //     const data2 = new DataManager({
    //         data: {name: "John Doe"},
    //     });
    //
    //     expect(data2.getData()).toEqual({name: "John Doe"});
    // });
    //
    // it("should initialize object with data from the getDefaultData prop", () => {
    //     const data1 = new DataManager({
    //         getDefaultData: () => ({name: "Jane Doe"}),
    //     });
    //
    //     expect(data1.getData()).toEqual({name: "Jane Doe"});
    //
    //     const data2 = new DataManager({
    //         getDefaultData: () => ({name: "Jane Doe"}),
    //     });
    //
    //     expect(data2.getData()).toEqual({name: "Jane Doe"});
    // });
    //
    // it("should merge data with getDefaultData when both are available and data should overwrite getDefaultData", () => {
    //     const d1 = {
    //         name: "data overwrite",
    //         weight: 240,
    //     };
    //
    //     const d2 = {
    //         name: "default data",
    //         age: 29,
    //     };
    //
    //     const data1 = new DataManager({
    //         data: d1,
    //         getDefaultData: () => d2,
    //     });
    //
    //     expect(data1.getData()).toEqual({
    //         name: "data overwrite",
    //         weight: 240,
    //         age: 29,
    //     });
    //
    //     const data2 = new DataManager({
    //         data: () => d1,
    //         getDefaultData: () => d2,
    //     });
    //
    //     expect(data2.getData()).toEqual({
    //         name: "data overwrite",
    //         weight: 240,
    //         age: 29,
    //     });
    // });
    //
    // it("should reset object data with default data", () => {
    //     const data = new DataManager({
    //         getDefaultData: () => ({
    //             firstName: "John",
    //             lastName: "Doe",
    //             age: 29,
    //             weight: 240,
    //         }),
    //     });
    //
    //     data.setData({
    //         address: {
    //             address1: "123 Main Street",
    //             zipcode: "12345",
    //         },
    //     });
    //
    //     expect(data.getData()).toEqual({
    //         firstName: "John",
    //         lastName: "Doe",
    //         age: 29,
    //         weight: 240,
    //         address: {
    //             address1: "123 Main Street",
    //             zipcode: "12345",
    //         },
    //     });
    //
    //     data.replaceData();
    //
    //     expect(data.getData()).toEqual({
    //         firstName: "John",
    //         lastName: "Doe",
    //         age: 29,
    //         weight: 240,
    //     });
    // });
});
