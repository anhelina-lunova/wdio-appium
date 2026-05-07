import { driver, expect } from "@wdio/globals";

const bundleId = "com.example.apple-samplecode.UICatalog";

describe("Native Actions", () => {
    beforeEach("Activate App", async () => {
        // driver.execute("mobile: activateApp", {
        //     appId: bundleId,
        // });
        await driver.activateApp(bundleId);
    });

    afterEach("Terminate App with cleaning", async () => {
        // driver.execute("mobile: terminateApp", {
        //     appId: bundleId,
        // });
        await driver.terminateApp(bundleId);
        try {
            await driver.execute("mobile: clearApp", { bundleId });
        } catch (error) {
            console.warn(`[CLEANUP] clearApp failed: ${error.message}`);
        }
    });

    describe("Alerts", () => {
        it("Accept/Dismiss Alerts", async () => {
            await $("~Alert Views").click();

            await $("~Simple").click();
            await driver.acceptAlert();

            await $("~Okay / Cancel").click();
            await driver.dismissAlert();

            await $("~Okay / Cancel").click();
            await driver.acceptAlert();

            await driver.pause(1000);
        });
    });

    describe("Swipe", () => {
        it("Swipe Slider", async () => {
            await $("~Sliders").click();
            await $("-ios class chain:**/XCUIElementTypeSlider[1]").setValue(
                "0",
            );
            await driver
                .action("pointer")
                .move({ duration: 0, x: 33, y: 181 })
                .down({ button: 0 })
                .move({ duration: 1000, x: 257, y: 182 })
                .up({ button: 0 })
                .perform();

            await expect(
                $("-ios class chain:**/XCUIElementTypeSlider[1]"),
            ).toHaveText("61%");
        });
    });
});
