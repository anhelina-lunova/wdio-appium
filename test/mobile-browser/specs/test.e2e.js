import { driver, expect } from "@wdio/globals";
import LoginPage from "../page-objects/screens/login.page";
import SecurePage from "../page-objects/screens/secure.page";

describe("My login application", () => {
    it("Should login with valid credentials", async () => {
        await LoginPage.open();

        await LoginPage.login("tomsmith", "SuperSecretPassword!");
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveText(
            expect.stringContaining("You logged into a secure area!"),
        );
    });
});
