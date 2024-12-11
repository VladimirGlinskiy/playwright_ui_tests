import {Locator, Page} from '@playwright/test';

export class CreateWalletModalElements {

    public connectWalletModal: Locator;
    public addAddressInput: Locator;
    public addWalletButton: Locator;

    constructor(public page: Page) {
        this.connectWalletModal = page.locator('xpath=//*[contains (@class, \'settings-dropdown\')]')
        this.addAddressInput = page.locator('xpath=//*[contains (@class, \'settings-dropdown\')]//input')
        this.addWalletButton = page.locator('xpath=//*[@class=\'add-button\']')
    }
}


