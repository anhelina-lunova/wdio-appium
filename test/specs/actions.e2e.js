import { driver, expect } from "@wdio/globals";
// import LoginPage from "#pages/login.page.js";
// import SecurePage from "#pages/secure.page.js";

describe("Actions", () => {
    it("Get text", async () => {
        console.log("Element text: " + (await $("~Accessibility").getText()));

        await expect($("~Accessibility")).toHaveText("Accessibility");
        await expect($("~Accessibility")).toHaveAttr("text", "Accessibility");
        await driver.pause(2000);
    });

    it("Set text", async () => {
        await $("~App").click();
        await $("~Search").click();
        await $("~Invoke Search").click();
        await $("id=io.appium.android.apis:id/txt_query_prefill").setValue(
            "Test text",
        );

        await expect(
            $("id=io.appium.android.apis:id/txt_query_prefill"),
        ).toHaveText("Test text");
        await expect(
            $("id=io.appium.android.apis:id/txt_query_prefill"),
        ).toHaveAttr("text", "Test text");
        await driver.pause(2000);
    });

    it("Dropdowns", async () => {
        await $("~App").click();
        await $("~Menu").click();
        await $("~Inflate from XML").click();
        await $("id=android:id/text1").click();
        await $(
            "//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Order'] ",
        ).click();

        await expect($("android.widget.ListView")).not.toBeExisting();
        await expect($("id=android:id/text1")).toHaveText("Order");
        await driver.pause(2000);
    });

    it("Checkboxes and Radio Buttons", async () => {
        await $("~Views").click();
        await $("~Controls").click();
        await $("~2. Dark Theme").click();
        await expect($("id=io.appium.android.apis:id/check1")).toHaveAttr(
            "checked",
            "false",
        );
        await $("id=io.appium.android.apis:id/check1").click();
        await expect($("id=io.appium.android.apis:id/check1")).toHaveAttr(
            "checked",
            "true",
        );
        await driver.pause(2000);
    });

    it("Multiple Elements", async () => {
        const elements = await $$("android.widget.TextView");

        for (const el of elements) {
            console.log(await el.getText());
        }

        await expect(elements[1]).toHaveText("Access'ibility");
        await driver.pause(2000);
    });

    it("Waits", async () => {
        await $("~Views").click();
        await $("~Chronometer").click();
        await $("~Start").click();
        await $("~5 seconds").waitForDisplayed();
        await $("~Stop").click();
        await driver.pause(2000);
    });
});
