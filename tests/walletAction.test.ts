import {PAGE_URL, WALLET_ADDRESS_1, WALLET_ADDRESS_2} from "../pageObjects/utils/Constants"
import {expect, test} from '@playwright/test';
import {MainPageActions} from '../pageObjects/entities/mainPageActions'
import {CreateWalletModalActions} from '../pageObjects/entities/createWalletModalActions'
import {WalletsListSideBarActions} from '../pageObjects/entities/walletsListSideBarActions'


test.beforeEach(async ({ page }) => {
    let driver = new MainPageActions(page);
    await driver.openMainPage(PAGE_URL);
});

test('Create an account from main page', async ({ page }) => {
    let mainPageActions = new MainPageActions(page);
    let createWalletModalActions = new CreateWalletModalActions(page)
    let walletsListSideBarActions = new WalletsListSideBarActions(page)

    await mainPageActions.openCreationWalletModal()
    await createWalletModalActions.setNewWalletAddress(WALLET_ADDRESS_1)
    const expected_value_usd : string = await createWalletModalActions.submitWalletCreation(WALLET_ADDRESS_1)

    let accName = await mainPageActions.getAccountName()
    // TODO: The behavior of the component needs to be clarified.
    //  Sometimes it shows literal name, sometimes it shows a hash
    expect(accName === WALLET_ADDRESS_1,
        `The chosen name and the shown name are not equal. Expected ${WALLET_ADDRESS_1}, but shown ${accName}`).toBeTruthy()

    await mainPageActions.openWalletsListSideBar()
    const api_value_usd = Math.round(parseFloat(expected_value_usd));
    const ui_value_usd = await walletsListSideBarActions.getAccountBalance(0)
    expect(api_value_usd === parseInt(ui_value_usd),
        `Sums are not equal. ${api_value_usd} from request and ${ui_value_usd} from UI` ).toBeTruthy()
});


test('Rename the account', async ({page}) => {
    let mainPageActions = new MainPageActions(page);
    let createWalletModalActions = new CreateWalletModalActions(page)
    let walletsListSideBarActions = new WalletsListSideBarActions(page)

    await mainPageActions.openCreationWalletModal()
    await createWalletModalActions.setNewWalletAddress(WALLET_ADDRESS_1)
    await createWalletModalActions.submitWalletCreation(WALLET_ADDRESS_1)
    let accName = await mainPageActions.getAccountName()
    expect(accName === WALLET_ADDRESS_1,
        `The chosen name and the shown name are not equal. Expected ${WALLET_ADDRESS_1}, but shown ${accName}`).toBeTruthy()

    await mainPageActions.openWalletsListSideBar()
    await walletsListSideBarActions.editWalletName(0, WALLET_ADDRESS_2)
    await mainPageActions.closeWalletsListSideBar()
    let newAccName = await mainPageActions.getAccountName()
    expect(newAccName === WALLET_ADDRESS_2,
        `Account name didn't change properly. The name shown in profile is ${newAccName}`).toBeTruthy()
})


test('Delete the account', async ({page}) => {
    let mainPageActions = new MainPageActions(page);
    let createWalletModalActions = new CreateWalletModalActions(page)
    let walletsListSideBarActions = new WalletsListSideBarActions(page)

    await mainPageActions.openCreationWalletModal()
    await createWalletModalActions.setNewWalletAddress(WALLET_ADDRESS_1)
    await createWalletModalActions.submitWalletCreation(WALLET_ADDRESS_1)

    expect(await mainPageActions.isAccountVisible(), "Account label doesn't shown in header").toBeTruthy()

    await mainPageActions.openWalletsListSideBar()
    await walletsListSideBarActions.removeTheWallet(0)

    expect(await mainPageActions.isAccountHidden(), "Account label haven't been removed from header").toBeTruthy()})