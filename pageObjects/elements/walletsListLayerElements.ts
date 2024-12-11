import {Locator, Page} from '@playwright/test';

export class WalletsListSideBarElements {

    public sideBarLayerElement: Locator;
    public closeSideBarButton: Locator;
    public sideBarInputElement: Locator;
    public sideBarAddAccountButton: Locator;
    public accountsElementsList: Locator;
    public sideBarConfirmEditAccountButton: Locator;

    private accountBalanceLabel: Locator;
    private removeAccountButton: Locator;
    private editAccountButton: Locator;


    constructor(public page: Page) {
        this.sideBarLayerElement = page.locator('xpath=//tui-dropdown')
        this.closeSideBarButton = page.locator('xpath=//*[@class=\'close-button\']')
        this.sideBarInputElement = page.locator('xpath=//tui-dropdown//input[@inputmode=\'text\']')
        this.sideBarAddAccountButton = page.locator('xpath=//*[@class = \'add-button\']')
        this.sideBarConfirmEditAccountButton = page.locator('xpath=//*[contains (@class, \'is-edit\')]/*[@type=\'primary\']')
        this.accountsElementsList = page.locator('xpath=//app-account-info')
    }

    public getEditAccountButton(index: number) {
        this.editAccountButton = this.accountsElementsList.nth(index).locator('xpath=//button[contains(@class, \'type-primary\')][1]')
        console.log(typeof this.editAccountButton )
        return this.editAccountButton
    }

    public getRemoveAccountButton(index: number) {
        this.removeAccountButton = this.accountsElementsList.nth(index).locator('xpath=//button[contains(@class, \'type-primary\')][2]')
        return this.removeAccountButton
    }

    public async getAccountBalanceLabel(index: number) {
        this.accountBalanceLabel = this.accountsElementsList.nth(index).locator('xpath=//*[contains (@class, \'account-option-value\')]')
        return this.accountBalanceLabel.nth(0).innerText()
    }
}

