class SignInForm {
    get emailField() {
        return $('#signinEmail');
    }
    get passwordField() {
        return $('#signinPassword');
    }
    get submitButton() {
        return $('.modal-content .btn-primary');
    }

    get errorMessage() {
        return $('.alert-danger');
    }

    get emailErrorMessage() {
        return $('form>div:nth-child(1) .invalid-feedback');
    }

    get emailLabel() {
        return $('label[for="signinEmail"]');
    }

    get passwordErrorMessage() {
        return $('form>div:nth-child(2) .invalid-feedback');
    }
    get passwordLabel() {
        return $('label[for="signinPassword"]');
    }

    async setEmail(email) {
        await this.emailField.setValue(email);
    }

    async clickEmailLabel() {
        await this.emailLabel.click();
    }

    async getEmailErrorMessageText() {
        return await this.emailErrorMessage.getText();
    }

    async setPassword(password) {
        await this.passwordField.setValue(password);
    }

    async clickPasswordLabel() {
        await this.passwordLabel.click();
    }

    async getPasswordErrorMessageText() {
        return await this.passwordErrorMessage.getText();
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async getWrongDataErrorMessage() {
        return await this.errorMessage.getText();
    }
}

export default new SignInForm();
