import {describe, expect, it, test} from "vitest";
import {getDate} from "../../src";

describe("some test", () => {
    it("test1", () => {
        console.log(getDate(new Date("march 29, 1985"), {timezone: "America/Los_Angeles"}));
    });
});
