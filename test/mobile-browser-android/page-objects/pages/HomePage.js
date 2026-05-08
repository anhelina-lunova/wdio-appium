class HomePage {
    get signinButton() {
        return $('.header_signin');
    }

    async openSigninForm() {
        await this.signinButton.click();
    }
}

export default new HomePage();
