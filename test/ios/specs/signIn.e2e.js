import { driver, expect } from "@wdio/globals";

const appId = "com.hillelAuto";

describe("Log In tests", () => {
    beforeEach("Activate App", async () => {
        await driver.activateApp(appId);
        await $("~Sign in").click();
        await $("id=Log in").waitForDisplayed();
    });

    afterEach("Terminate App", async () => {
        await driver.terminateApp(appId);
        try {
            // For iOS (XCUITest) parameter should be bundleId instead of appId
            await driver.execute("mobile: clearApp", { bundleId: appId });
        } catch (error) {
            console.warn(`[CLEANUP] clearApp failed: ${error.message}`);
        }
    });

    it("Log In with correct credentials", async () => {
        const inputs = await $$("XCUIElementTypeTextField");
        const emailInput = inputs[0];
        const passwordInput = inputs[1];
        //
        const garagePageTitle = await $("~Garage");

        await emailInput.setValue(process.env.USER_EMAIL);
        await passwordInput.setValue(process.env.USER_PASSWORD);
        await driver.keys("Enter");
        await $("~Login").click();

        await expect(garagePageTitle).toBeDisplayed();
    });

    it("Log In with incorrect credentials", async () => {
        const inputs = await $$("XCUIElementTypeTextField");
        const emailInput = inputs[0];
        const passwordInput = inputs[1];
        const warning = await $("~Wrong email or password");
        await emailInput.setValue("your-email@example.com");
        await passwordInput.setValue("password");
        await driver.keys("Enter");
        await $("~Login").click();

        await expect(warning).toBeDisplayed();
    });

    it("Log In without email", async () => {
        const inputs = await $$("XCUIElementTypeTextField");
        const emailInput = inputs[0];
        const passwordInput = inputs[1];
        const warningEmail = await $("id=Email is required");
        await emailInput.setValue("");
        await passwordInput.setValue("password");
        await driver.keys("Enter");
        await $("~Login").click();

        await expect(warningEmail).toBeDisplayed();
    });

    it("Log In without password", async () => {
        const inputs = await $$("XCUIElementTypeTextField");
        const emailInput = inputs[0];
        const passwordInput = inputs[1];
        const warningPassword = await $("id=Password is too short");
        await emailInput.setValue("your-email@example.com");
        await passwordInput.setValue("");
        await driver.keys("Enter");
        await $("~Login").click();

        await expect(warningPassword).toBeDisplayed();
    });

    it("Opening Registration popup", async () => {
        await $("~Registration").click();
        await $("id=Register").waitForDisplayed();

        await expect(await $("id=Register")).toBeDisplayed();
    });

    it("Opening Restore Access popup", async () => {
        await $("~Forgot Password").click();

        await expect(await $("id=Restore access")).toBeDisplayed();
    });
});
