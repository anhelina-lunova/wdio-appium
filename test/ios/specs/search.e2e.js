import { driver, expect } from "@wdio/globals";

describe("Search elements", () => {
    it("by Accessibility ID", async () => {
        await $("~Steppers").click();
        await driver.pause(2000);
    });

    it("by Class Name (type)", async () => {
        const elements = await $$("XCUIElementTypeStaticText");
        await expect(elements).toBeElementsArrayOfSize(37);
    });

    it("by Xpath", async () => {
        await $('//XCUIElementTypeStaticText[@name="Image View"]').click();
        await driver.pause(2000);
    });

    it("by ID (name)", async () => {
        await $("id=Buttons").click();
        await driver.pause(2000);
    });

    it("by Predicate String", async () => {
        await $('-ios predicate string:name == "Switches"').click();
        await driver.pause(2000);
    });

    it("by Class Chain", async () => {
        await $(
            '-ios class chain:**/XCUIElementTypeStaticText[`name == "Text Fields"`]',
        ).click();
        await driver.pause(2000);
    });
});
