/**
====== Task 1 ======

Go to the App→Search→Invoke Search screen
Verify that the desired screen is actually open
Enter any text in the Prefill query field
Enter any text in the App Data field
Verify that both fields have text entered.
Clear the first field and verify that it is empty

====== Task 2 ======

Go to the Views→Controls→Any Topic screen
Verify that the appropriate screen is open
Check for Checkbox 1 and RadioButton 2
Verify that Checkbox 1 and RadioButton 2 are checked
Select Mars from the dropdown 
*/

import { expect } from "@wdio/globals";

describe("Homework 2: Actions with elements", () => {
    it("Task 1", async () => {
        await $("~App").click();
        await $("~Search").click();
        await $("~Invoke Search").click();

        await expect(
            $('android=new UiSelector().text("App\/Search\/Invoke Search")'),
        ).toBeDisplayed();

        await $("id=io.appium.android.apis:id/txt_query_prefill").setValue(
            "Prefill query text",
        );

        await $("id=io.appium.android.apis:id/txt_query_appdata").setValue(
            "App Data text",
        );

        await expect(
            $("id=io.appium.android.apis:id/txt_query_prefill"),
        ).toHaveText("Prefill query text");

        await $("id=io.appium.android.apis:id/txt_query_prefill").clearValue();

        await expect(
            $("id=io.appium.android.apis:id/txt_query_prefill"),
        ).toHaveText("");
    });

    it("Task 2", async () => {
        await $("~Views").click();
        await $("~Controls").click();

        const themesList = await $$("id=android:id/text1");
        const holoDarkTheme = themesList[3];
        await holoDarkTheme.click();

        const title = await $("id=android:id/action_bar_title");
        await expect(title).toHaveText(expect.stringContaining("Holo Dark"));

        const checkbox1 = await $("id=io.appium.android.apis:id/check1");
        const radioBtn1 = await $("id=io.appium.android.apis:id/radio1");

        await expect(checkbox1).toHaveAttr("checked", "false");
        await expect(radioBtn1).toHaveAttr("checked", "false");

        await checkbox1.click();
        await radioBtn1.click();

        await expect(checkbox1).toHaveAttr("checked", "true");
        await expect(radioBtn1).toHaveAttr("checked", "true");
    });
});
