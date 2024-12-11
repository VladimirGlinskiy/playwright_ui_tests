
import {V2_LOOKUP_RESPONSE_EXAMPLE, TIMEOUT} from "../utils/Constants"
import {expect, Page} from "@playwright/test";
import {CreateWalletModalElements} from "../elements/createWalletModalElements"

export class CreateWalletModalActions {
    private page;
    private walletModalElements

    constructor(public externalPage: Page) {
        this.page = externalPage;
        this.walletModalElements = new CreateWalletModalElements(this.page)
    }

    public async setNewWalletAddress(string: String){
        await this.walletModalElements.addAddressInput.click()
        await this.walletModalElements.addAddressInput.fill(string)
    }

    public async submitWalletCreation(userName :string){

        var requestUrl: string;

        this.page.on('request', request => { requestUrl = request.url()});
        const responsePromise = this.page.waitForResponse(RegExp(".+v2.0\/lookup.+"), TIMEOUT);
        const responsePromiseSecond = this.page.waitForResponse(RegExp(".+portfolio\/v4\/general\/current_value.+"));

        await this.walletModalElements.addWalletButton.click()
        var nameParamValue :string  =  this.getQueryParam(requestUrl)
        expect( nameParamValue === userName, `Expected value: \"${userName}\", but got \"${nameParamValue}\"`).toBeTruthy()

        await this.walletModalElements.connectWalletModal.waitFor("hidden");
        const response = await responsePromise;
        const responseSecond = await responsePromiseSecond

        expect(await response.json()).toMatchObject(V2_LOOKUP_RESPONSE_EXAMPLE)
        expect(response.ok(), `Request \"..2.0\/lookup\..\" has fallen with status ${response.status()}`).toBeTruthy()

        expect(responseSecond.status() === 200, `Request \"..v4\/general\/current_value...\" has wrong status \"${responseSecond.status()}\"`).toBeTruthy()
        const value_usd:string = JSON.parse(await responseSecond.body())["result"][0]["value_usd"]

        return value_usd
    }

    private getQueryParam (url:string){
        const parsedUrl = new URL(url);
        const paramName = 'name';
        var result = parsedUrl.searchParams.get(paramName)
        return result
    }
}




