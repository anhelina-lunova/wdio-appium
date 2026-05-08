// import { expect, browser, $ } from '@wdio/globals';

import GaragePage from "#pages-android-browser/GaragePage.js";
import HomePage from "#pages-android-browser/HomePage.js";
import SignInForm from "#forms-android-browser/SignInForm.js";

describe("Form validation", () => {
    beforeEach("Login", async () => {
        await browser.url(
            "https://" + process.env.CREDENTIALS + "qauto.forstudy.space/",
        );
        await HomePage.openSigninForm();
    });

    describe("Form validation - incorrect data", () => {
        it("Email field - email is empty", async () => {
            await SignInForm.setEmail("");
            await SignInForm.clickEmailLabel();
            await expect(await SignInForm.getEmailErrorMessageText()).toBe(
                "Email required",
            );
        });

        it("Password field - password is empty", async () => {
            await SignInForm.setPassword("");
            await SignInForm.clickPasswordLabel();
            await expect(await SignInForm.getPasswordErrorMessageText()).toBe(
                "Password required",
            );
        });

        it("Email field - incorrect format", async () => {
            await SignInForm.setEmail("testuser");
            await SignInForm.clickEmailLabel();
            await expect(await SignInForm.getEmailErrorMessageText()).toBe(
                "Email is incorrect",
            );
        });

        it("Email and Password fields - incorrect data", async () => {
            await SignInForm.setEmail("testuser@gmail.com");
            await SignInForm.setPassword("testpassword");
            await SignInForm.clickSubmitButton();
            await expect(await SignInForm.getWrongDataErrorMessage()).toBe(
                "Wrong email or password",
            );
        });
    });

    describe("Form validation - correct data", () => {
        it("Email and Password fields - incorrect data", async () => {
            await SignInForm.setEmail(process.env.USER_EMAIL);
            await SignInForm.setPassword(process.env.USER_PASSWORD);
            await SignInForm.clickSubmitButton();
            await GaragePage.verifyGaragePageIsReady();
            await expect(await browser.getUrl()).toContain("/panel/garage");
        });
    });
});
