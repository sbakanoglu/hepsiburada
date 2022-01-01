import { When } from "@cucumber/cucumber";
import { expect } from "chai";

import ConfigUtils from '@support/ConfigUtils';
import PageObject from './ProductPageObject';

When(/^Ürün listesinden rastgele bir tane ürün seçilir.$/, async function (): Promise<void | boolean> {
    await PageObject.urunWrapper.waitForExist({ timeout: ConfigUtils.WaitTimeOut });

    const random = Math.floor((Math.random() * await PageObject.urunList.length));

    const href = await PageObject.randomProductPicker(random).getAttribute("href");
    await PageObject.randomProductPicker(random).click();

    await browser.switchWindow(href);
    return await PageObject.saticiInfo.waitForExist({ timeout: ConfigUtils.WaitTimeOut });
});

When(/^Ürün detay sayfasında sepete ekle butonuna basarız.$/, async function (): Promise<void> {
    await PageObject.sepeteEkleButton.click();

    await PageObject.modalPopUp.waitForDisplayed({ timeout: ConfigUtils.WaitTimeOut });

    // expect(await PageObject.modalSuccess.getText() == "Ürün sepetinizde", 'Ürün sepete eklenemedi !').to.be.true;

    return await PageObject.modalClose.click();
});

When(/^Diğer 2 satıcıdan aynı ürün sepete eklenir.$/, async function (): Promise<void> {
    const counter = await PageObject.baskaSaticilar.length;

    expect(counter == 2, 'Diğer 2 satıcı bulunmamakta. !').to.be.true;

    for (let i = 0; i < counter; i++) {
        await PageObject.baskaSaticilar[i].click();

        // expect(await PageObject.modalSuccess.getText() == "Ürün sepetinizde", 'Ürün sepete eklenemedi !').to.be.true;

        await PageObject.modalClose.click();
    }

    return;
});