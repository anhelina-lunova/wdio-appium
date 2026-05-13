import { driver, expect } from "@wdio/globals";

describe("Search elements", () => {
    it("Accessibility ID", async () => {
        await $("~App").click();
        await $("~Device Admin").click();
        await driver.pause(2000);
    });

    it("Resource ID", async () => {
        await expect($("id=android:id/action_bar")).toBeDisplayed();
        await driver.pause(2000);
    });

    it("UI selector", async () => {
        await $('android=new UiSelector().text("NFC")').click();
        await driver.pause(2000);
    });

    it("Class Name", async () => {
        const elements = await $$(".android.widget.TextView");
        await expect(elements).toBeElementsArrayOfSize(12);
        await driver.pause(2000);
    });

    it("Xpath", async () => {
        await $("//android.widget.TextView[@content-desc='Media']").click();
        await $("(//android.widget.TextView)[3]").click();
        await driver.pause(2000);
    });
});
