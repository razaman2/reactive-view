import {describe, it, expect} from "vitest";
import {access, safeRequest} from "../../src";

describe("test1", () => {
    it("test2", () => {
        const vue1 = {
            self: {
                test1: "test1",
            },
            parent: {
                self: {
                    test2: "test2",
                },
                parent: {
                    self: {
                        test3: "test3",
                    },
                },
            },
        };

        const vue2 = {
            access: () => {
                return vue1;
            },
        };

        const vue3 = {
            value: vue1,
        };

        const vue4 = {
            value: vue2,
        };

        expect(access().test3).toBeUndefined();
        expect(access(vue1).test3).toBe("test3");
        expect(access(vue2).test3).toBe("test3");
        expect(access(vue3).test3).toBe("test3");
        expect(access(vue4).test3).toBe("test3");
    });

    it("safe request", () => {
        const output = safeRequest({
            try: () => {
                return "tried it";
            },
        });
    });
});
