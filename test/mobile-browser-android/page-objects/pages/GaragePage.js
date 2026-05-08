class GaragePage {
    get carsPanel() {
        return $('.panel-page');
    }

    get addNewCarButton() {
        return $('.btn-primary');
    }

    get brandDropdown() {
        return $('#addCarBrand');
    }

    get modelDropdown() {
        return $('#addCarModel');
    }

    get mileageField() {
        return $('#addCarMileage');
    }

    get addCarButton() {
        return $('.modal-footer .btn-primary');
    }

    get lastAddedCarName() {
        // return $('.car_name');
        return $('.car-item:first-child .car_name');
    }

    // const addCarModelDropdown = await $('#addCarModel');

    async verifyGaragePageIsReady() {
        await this.carsPanel.waitForDisplayed();
    }

    async clickAddNewCarButton() {
        await this.addNewCarButton.click();
    }

    async addCarByBrandAndModel(brand, model, mileage) {
        await this.clickAddNewCarButton();

        await this.brandDropdown.$('option[value="1: 2"]').waitForExist();
        await this.brandDropdown.selectByVisibleText(brand);

        await browser.pause(500);
        await this.modelDropdown.selectByVisibleText(model);
        // await this.addModelDropdown.selectByIndex(modelIndex);

        const selectedText = await this.modelDropdown
            .$('option:checked')
            .getText();

        expect(selectedText).toBe(model);
        await this.mileageField.setValue(mileage);
        await this.addCarButton.click();
    }

    async verifyLastAddedCar(text) {
        await browser.pause(500);
        expect(await this.lastAddedCarName.getText()).toBe(text);
    }
}

export default new GaragePage();
