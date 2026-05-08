import HomePage from "#pages-android-browser/HomePage.js";
import SignInForm from "#forms-android-browser/SignInForm.js";
import GaragePage from "#pages-android-browser/GaragePage.js";

describe("Garage Page", () => {
    beforeEach("Login", async () => {
        await browser.url(
            "https://" + process.env.CREDENTIALS + "qauto.forstudy.space/",
        );
        await HomePage.openSigninForm();
        await SignInForm.setEmail(process.env.USER_EMAIL);
        await SignInForm.setPassword(process.env.USER_PASSWORD);
        await SignInForm.clickSubmitButton();
        await GaragePage.verifyGaragePageIsReady();
        await expect(await browser.getUrl()).toContain("/panel/garage");
    });

    it("Add a car - BMW X5", async () => {
        await GaragePage.addCarByBrandAndModel("BMW", "X5", "50");
        await GaragePage.verifyLastAddedCar("BMW X5");
    });

    it("Add a car - Ford Focus", async () => {
        await GaragePage.addCarByBrandAndModel("Ford", "Focus", "100");
        await GaragePage.verifyLastAddedCar("Ford Focus");
    });
});
