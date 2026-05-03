import { expect } from "@wdio/globals";
// import LoginPage from "#pages/login.page.js";
// import SecurePage from "#pages/secure.page.js";

describe("Homework 1: Search elements", () => {
    it("All cases one by one", async () => {
        // Accessibility ID
        const preference = await $("~Preference");
        await expect(preference).toBeDisplayed();
        await preference.click();

        // Resource ID + a few elements
        const preferenceItems = await $$("id=android:id/text1");
        await expect(preferenceItems).toBeElementsArrayOfSize(9);
        await preferenceItems[2].click();

        // UI Selector + Xpath + Class Name
        const settingsWiFi = $(
            'android=new UiSelector().text("WiFi settings")',
        );
        await expect(settingsWiFi).toBeDisabled();
        const parentWiFi = await $("//android.widget.LinearLayout");
        const checkboxWiFi = await parentWiFi.$("android.widget.CheckBox");
        await checkboxWiFi.click();
        await expect(settingsWiFi).toBeEnabled();
    });
});
