import {Page} from "@playwright/test";
import {WalletsListSideBarElements} from "../elements/walletsListLayerElements"

export class WalletsListSideBarActions {
    private page;
    private walletsListSideBarElements;

    constructor(public externalPage: Page) {
        this.page = externalPage;
        this.walletsListSideBarElements = new WalletsListSideBarElements(this.page)
    }

    public async getAccountBalance(walletNumber: number) {
        const elem = await this.walletsListSideBarElements.getAccountBalanceLabel(walletNumber)
        return elem.replace(/[\s$]/g, '')
    }

    public async editWalletName(walletNumber: number, newWalletName: string) {
        const editButton = await this.walletsListSideBarElements.getEditAccountButton(walletNumber)
        await editButton.click()
        await this.walletsListSideBarElements.sideBarInputElement.waitFor("visible")
            .then(()=> this.walletsListSideBarElements.sideBarInputElement.focus());
        await this.walletsListSideBarElements.sideBarInputElement.press('Control+A')
        await this.walletsListSideBarElements.sideBarInputElement.press("Delete")
        await this.walletsListSideBarElements.sideBarInputElement.fill(newWalletName)
        await this.walletsListSideBarElements.sideBarConfirmEditAccountButton.click()
    }

    public async removeTheWallet(walletNumber: number) {
        const deleteButton = await this.walletsListSideBarElements.getRemoveAccountButton(walletNumber)
        await deleteButton.click()
        await this.walletsListSideBarElements.sideBarLayerElement.waitFor("hidden")
    }
}

