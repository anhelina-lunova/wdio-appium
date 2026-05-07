import { driver, expect } from "@wdio/globals";

describe("Actions", () => {
    it("Set + Get text", async () => {
        await $("~Text Fields").click();
        const inputFields = await $$("XCUIElementTypeTextField");
        const defaultInputField = inputFields[0];

        console.log("Element text: " + (await defaultInputField.getText()));

        await expect(defaultInputField).toHaveAttr("value", "Placeholder text");

        await defaultInputField.setValue("Test text");

        await expect(defaultInputField).toHaveText("Test text");
    });

    it("Picker Wheel", async () => {
        await $("~Picker View").click();
        await $("~Red color component value").setValue("60");
        await expect($("~Red color component value")).toHaveText("60");
    });

    it("Sliders - Optimized via Class Chain", async () => {
        /**
         describe('iOS Slider with tolerance', () => {
            it('should set the slider value with tolerance', async () => {
                const slider = await $('~slider');
                const targetValue = 0.5; // 50%
                await slider.setValue(targetValue);

                // Get actual value
                const actualValue = parseFloat(await slider.getAttribute('value')) / 100; // Convert to range [0, 1]
                
                // Verify the value with tolerance
                const tolerance = 0.01; // 1%
                expect(Math.abs(actualValue - targetValue)).toBeLessThanOrEqual(tolerance);
            });
        });
         */

        await $("~Sliders").click();

        // Example of accessing a specific slider by index inside a selector
        // This works faster than retrieving the entire array $$
        await $("-ios class chain:**/XCUIElementTypeSlider[1]").setValue("0");
        await $("-ios class chain:**/XCUIElementTypeSlider[2]").setValue(
            "0.25",
        );
        await $("-ios class chain:**/XCUIElementTypeSlider[3]").setValue(
            "0.75",
        );
        await $("-ios class chain:**/XCUIElementTypeSlider[4]").setValue("1");
        await expect(
            $("-ios class chain:**/XCUIElementTypeSlider[1]"),
        ).toHaveText("0%");
        await expect(
            $("-ios class chain:**/XCUIElementTypeSlider[2]"),
        ).toHaveText("25%");
        await expect(
            $("-ios class chain:**/XCUIElementTypeSlider[3]"),
        ).toHaveText("75%");
        await expect(
            $("-ios class chain:**/XCUIElementTypeSlider[4]"),
        ).toHaveText("100%");
    });
});
