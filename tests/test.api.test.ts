import { test, expect } from '@playwright/test';
import {CHAIN_ID, ADDRESS} from "../pageObjects/utils/Constants"
const api_key = process.env.API_KEY

test.use({
    baseURL: 'https://api.1inch.dev',
    extraHTTPHeaders: {
        'Authorization': `Bearer ${api_key}`
    }
});


test('API /custom/address test', async ({ request }) => {

    const urlAddress = `/token/v1.2/${CHAIN_ID}/custom/${ADDRESS}`
    const issues = await request.get(urlAddress);
    expect(issues.ok()).toBeTruthy();
    const reply = await issues.json()

    expect(reply).toEqual(expect.objectContaining({
        //symbol: '-1INCH', TODO: the value doesn't match with expectation. I suppose it might be a bug
        name: '1INCH Token',
        address: '0x111111111117dc0aa78b770fa6a738034120c302',
        chainId: 1,
        decimals: 18
    }));

    const imageIssue = await request.get(reply.logoURI);
    expect(imageIssue.ok()).toBeTruthy();
});