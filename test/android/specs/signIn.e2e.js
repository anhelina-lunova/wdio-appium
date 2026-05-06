import { driver, expect } from "@wdio/globals";

const appId = "com.hillelAuto";

describe("Log In tests", () => {
    beforeEach("Activate App", async () => {
        await driver.activateApp(appId);
        await $("~Sign in").click();
        await $('android=new UiSelector().text("Log in")').waitForDisplayed();
    });

    afterEach("Terminate App", async () => {
        // Cleans up the app by terminating it and clearing the data.
        await driver.terminateApp(appId);
        try {
            await driver.execute("mobile: clearApp", { appId });
        } catch (error) {
            console.warn(`[CLEANUP] clearApp failed: ${error.message}`);
        }
    });

    it("Log In with correct credentials", async () => {
        const emailInput = await $(
            'android=new UiSelector().text("Email").fromParent(new UiSelector().className("android.widget.EditText").instance(0))',
        );
        const passwordInput = await $(
            'android=new UiSelector().text("Password").fromParent(new UiSelector().className("android.widget.EditText").instance(1))',
        );
        const garagePageTitle = await $(
            'android=new UiSelector().text("Garage")',
        );

        await emailInput.setValue(process.env.USER_EMAIL);
        await passwordInput.setValue(process.env.USER_PASSWORD);
        await $("~Login").click();

        await expect(garagePageTitle).toBeDisplayed();
    });

    it("Log In with incorrect credentials", async () => {
        const emailInput = await $(
            'android=new UiSelector().text("Email").fromParent(new UiSelector().className("android.widget.EditText").instance(0))',
        );
        const passwordInput = await $(
            'android=new UiSelector().text("Password").fromParent(new UiSelector().className("android.widget.EditText").instance(1))',
        );
        const warning = await $(
            'android=new UiSelector().text("Wrong email or password")',
        );
        await emailInput.setValue("your-email@example.com");
        await passwordInput.setValue("password");
        await $("~Login").click();

        await expect(warning).toBeDisplayed();
    });

    it("Log In without email", async () => {
        const emailInput = await $(
            'android=new UiSelector().text("Email").fromParent(new UiSelector().className("android.widget.EditText").instance(0))',
        );
        const passwordInput = await $(
            'android=new UiSelector().text("Password").fromParent(new UiSelector().className("android.widget.EditText").instance(1))',
        );
        const warningEmail = await $(
            'android=new UiSelector().text("Email is required")',
        );
        await emailInput.setValue("");
        await passwordInput.setValue("password");
        await $("~Login").click();

        await expect(warningEmail).toBeDisplayed();
    });

    it("Log In without password", async () => {
        const emailInput = await $(
            'android=new UiSelector().text("Email").fromParent(new UiSelector().className("android.widget.EditText").instance(0))',
        );
        const passwordInput = await $(
            'android=new UiSelector().text("Password").fromParent(new UiSelector().className("android.widget.EditText").instance(1))',
        );
        const warningPassword = await $(
            'android=new UiSelector().text("Password is too short")',
        );
        await emailInput.setValue("your-email@example.com");
        await passwordInput.setValue("");
        await $("~Login").click();

        await expect(warningPassword).toBeDisplayed();
    });

    it("Opening Registration popup", async () => {
        await $("~Registration").click();
        await $("~Register").waitForDisplayed();

        await expect(await $("~Register")).toBeDisplayed();
    });

    it("Opening Restore Access popup", async () => {
        await $("~Forgot Password").click();

        await expect(
            await $('android=new UiSelector().text("Restore access")'),
        ).toBeDisplayed();
    });
});
