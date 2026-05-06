/**
Application: API Demos

Task 1: 
Scroll to the very bottom of the Views screen (to the WebView3 element) by mapping the scroll by coordinates

Task 2: 
Scroll to the very bottom of the Views screen (to the WebView3 element) by mapping the scroll to the element
*/

import { driver, expect } from "@wdio/globals";

describe("Homework 3: Native Actions", () => {
    beforeEach("Activate App", async () => {
        await driver.activateApp("io.appium.android.apis");
        await $("~Views").click();
    });

    afterEach("Terminate App", async () => {
        await driver.terminateApp("io.appium.android.apis");
    });

    describe("Scroll", async () => {
        it("By coordinates", async () => {
            while (!(await $("~WebView3").isDisplayed())) {
                await driver
                    .action("pointer")
                    .move({ duration: 0, x: 741, y: 2844 })
                    .down({ button: 0 })
                    .move({ duration: 1000, x: 725, y: 288 })
                    .up({ button: 0 })
                    .perform();
            }
            await expect(await $("~WebView3")).toBeDisplayed();
        });

        it("Scroll to the element", async () => {
            const element = await $(
                "android=new UiScrollable(new UiSelector().scrollable(true))" +
                    '.scrollIntoView(new UiSelector().text("WebView3"))',
            );

            await expect(element).toBeDisplayed();
        });
    });
});
