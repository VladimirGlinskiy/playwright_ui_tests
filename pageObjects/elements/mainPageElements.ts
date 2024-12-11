import {Locator, Page} from '@playwright/test';

export class MainPageElements {

    public bundlesListWrap: Locator;
    public connectWalletButton: Locator;
    public appAccountButton: Locator;
    public appAccountButtonLabel: Locator;
    public topWalletsIsland: Locator;

    public appRatingBanner: Locator;
    public appRatingBannerCloseButton: Locator;
    public cookiesPopUp: Locator;
    public cookiesPopUpCloseButton: Locator;

    //public headerElement: Locator;

    constructor(public page: Page) {
        //this.headerElement = page.locator('xpath=//*[@class=\'app-header-wrap\']')
        // TODO: To clarify a question about duplicating buttons in header element. There are 3 'app-account-button' in DOM, but only one is visible
        this.bundlesListWrap = page.locator('xpath=//*[contains(@class, \'bundles-list-wrap\')]')
        this.connectWalletButton = this.bundlesListWrap.locator('xpath=//*[contains(@class,\'connect-wallet-button\')]')
        this.appAccountButton = this.bundlesListWrap.locator('xpath=//button[contains(@class, \'account-button\')]')
        this.appAccountButtonLabel = this.bundlesListWrap.locator('xpath=//*[@class=\'account-button-label\']')

        this.appRatingBanner = page.locator('xpath=//app-banner-query')
        this.appRatingBannerCloseButton = page.locator('xpath=//*[contains(@class,\'card-1inch__close-button\')]')

        this.cookiesPopUp = page.locator('xpath=//app-floating-popup')
        this.cookiesPopUpCloseButton = page.locator('xpath=//app-floating-popup//button[contains(@class, \'close-button\')]')

        this.topWalletsIsland = page.locator('xpath=//*[contains(@class,\'island\')]')
    }
}