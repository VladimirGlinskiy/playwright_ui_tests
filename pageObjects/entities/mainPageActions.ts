import {TIMEOUT} from "../utils/Constants"
import {Page} from "@playwright/test";
import {MainPageElements} from "../elements/mainPageElements"
import {CreateWalletModalElements} from "../elements/createWalletModalElements";
import {WalletsListSideBarElements} from "../elements/walletsListLayerElements";

export class MainPageActions {
    private page;
    private mainPageElements;
    private createWalletModalElements;
    private walletsListLayerElements;

    constructor(public externalPage: Page) {
        this.page = externalPage;
        this.mainPageElements = new MainPageElements (this.page)
        this.createWalletModalElements = new CreateWalletModalElements (this.page)
        this.walletsListLayerElements = new WalletsListSideBarElements (this.page)
    }

    public async openMainPage(string :String){
        await this.page.goto(string);
        await this.mainPageElements.topWalletsIsland.waitFor("visible");
        await this.mainPageElements.topWalletsIsland.hover();

        await this.mainPageElements.appRatingBanner.waitFor("visible");
        await this.mainPageElements.appRatingBannerCloseButton.click()
        await this.mainPageElements.appRatingBanner.waitFor("hidden")

        await this.mainPageElements.cookiesPopUp.waitFor("visible");
        await this.mainPageElements.cookiesPopUpCloseButton.click()
        await this.mainPageElements.cookiesPopUp.waitFor("hidden");
    }

    public async openCreationWalletModal(){
        await this.mainPageElements.connectWalletButton.click()
        await this.createWalletModalElements.connectWalletModal.waitFor("visible");
    }

    public async openWalletsListSideBar(){

        await this.mainPageElements.appAccountButton.click()
        await this.walletsListLayerElements.sideBarLayerElement.waitFor("visible")
    }

    public async closeWalletsListSideBar(){
        await this.walletsListLayerElements.closeSideBarButton.click()
        await this.walletsListLayerElements.sideBarLayerElement.waitFor("hidden")
    }

    public async isAccountVisible(){
        await this.mainPageElements.appAccountButton.waitFor("visible", TIMEOUT)
        return await this.mainPageElements.appAccountButton.isVisible()
    }

    public async isAccountHidden(){
        return await this.mainPageElements.appAccountButton.isHidden()
    }

    public async getAccountName() {
        let accountName:String = await this.mainPageElements.appAccountButtonLabel.innerText()
        return accountName;
    }
}

