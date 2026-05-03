import { driver, expect } from "@wdio/globals";

describe("Native Actions", () => {
    beforeEach("Activate App", async () => {
        // driver.execute("mobile: activateApp", {
        //     appId: "io.appium.android.apis",
        // });
        await driver.activateApp("io.appium.android.apis");
    });

    afterEach("Terminate App", async () => {
        // driver.execute("mobile: terminateApp", {
        //     appId: "io.appium.android.apis",
        // });
        await driver.terminateApp("io.appium.android.apis");
    });

    describe("Package - Multiple tests", () => {
        it("Test 1", async () => {
            await $("~App").click();
            await driver.pause(1000);
        });
        it("Test 2", async () => {
            await $("~Content").click();
            await driver.pause(1000);
        });
        it("Test 3", async () => {
            await $("~Graphics").click();
            await driver.pause(1000);
        });
    });

    describe("Activity", () => {
        // .ApiDemos
        // .app.AlarmController
        it("Test 1", async () => {
            await driver.startActivity(
                "io.appium.android.apis",
                ".app.AlarmController",
            );
            await expect(
                $(
                    "~This demonstrates how to schedule and handle one-shot and repeating alarms.",
                ),
            ).toBeDisplayed();
        });
    });

    describe("Scroll", async () => {
        it("By coordinates", async () => {
            await driver.activateApp("io.appium.android.apis");
            await $("~Views").click();

            await driver
                .action("pointer")
                .move({ duration: 0, x: 693, y: 2215 })
                .down({ button: 0 })
                .move({ duration: 1000, x: 685, y: 669 })
                .up({ button: 0 })
                .perform();
        });

        it.only("By coordinates with performActions", async () => {
            await driver.activateApp("io.appium.android.apis");
            await $("~Views").click();

            await driver.performActions([
                {
                    type: "pointer",
                    id: "finger1",
                    parameters: { pointerType: "touch" },
                    actions: [
                        { type: "pointerMove", duration: 0, x: 500, y: 1200 },
                        { type: "pointerDown", button: 0 },
                        { type: "pause", duration: 500 },
                        { type: "pointerMove", duration: 1000, x: 500, y: 200 },
                        { type: "pointerUp", button: 0 },
                    ],
                },
            ]);

            await driver.releaseActions();
        });

        it("Scroll to the element", async () => {
            await driver.activateApp("io.appium.android.apis");
            await $("~Views").click();

            const element = await $(
                "android=new UiScrollable(new UiSelector().scrollable(true))" +
                    '.scrollIntoView(new UiSelector().text("Rating Bar"))',
            );

            await expect(element).toBeDisplayed();
        });

        it("Swipe to the end", async () => {
            await driver.activateApp("io.appium.android.apis");
            await $("~Views").click();

            await browser.swipe({ scrollableElement: $("id=android:id/list") });
        });

        it("Accept Alert", async () => {
            await driver.activateApp("io.appium.android.apis");
            await $("~App").click();
            await $("~Alert Dialogs").click();
            await $("id=io.appium.android.apis:id/two_buttons").click();
            await driver.acceptAlert();
        });

        it("Dismiss Alert", async () => {
            await driver.activateApp("io.appium.android.apis");
            await $("~App").click();
            await $("~Alert Dialogs").click();
            await $("id=io.appium.android.apis:id/two_buttons").click();
            await driver.dismissAlert();
        });

        it("Hide Keyboard", async () => {
            await driver.startActivity(
                "io.appium.android.apis",
                ".app.SearchInvoke",
            );
            await $("id=io.appium.android.apis:id/txt_query_prefill").click();
            await driver.hideKeyboard();
        });
    });
});
