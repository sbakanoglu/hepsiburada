import { Given, When } from "@cucumber/cucumber";
import { expect } from "chai";

import ConfigUtils from '@support/ConfigUtils';
import PageObject from './LoginPageObject';

Given(/^Kullanıcı Giriş yap yazısının üzerine gelerek giriş yap linkine tıklar.$/, async function (): Promise<void> {
    await PageObject.girisYapHover.waitForDisplayed({ timeout: ConfigUtils.WaitTimeOut });
    await PageObject.girisYapHover.moveTo();

    await browser.pause(500);
    return await PageObject.girisYapLink.click();
});

Given(/^Eposta "([^"]*)" yazıldıktan sonra giriş yap butona basılır.$/, async function (kullaniciAdi: string): Promise<void | boolean> {
    await PageObject.epostaInput.waitForDisplayed({ timeout: ConfigUtils.WaitTimeOut });

    await PageObject.epostaInput.addValue(kullaniciAdi);
    await PageObject.girisYapButton.waitForClickable({ timeout: ConfigUtils.WaitTimeOut });

    return await PageObject.girisYapButton.click();
});

Given(/^Şifre "([^"]*)" yazıldıktan sonra giriş yap butona basılır.$/, async function (sifre: string): Promise<void | boolean> {
    await PageObject.sifreInput.waitForDisplayed({ timeout: ConfigUtils.WaitTimeOut });
    await PageObject.sifreInput.addValue(sifre);

    await PageObject.girisYapEmailButton.waitForClickable({ timeout: ConfigUtils.WaitTimeOut });
    await PageObject.girisYapEmailButton.click();

    return await PageObject.girisYapEmailButton.waitForDisplayed({ timeout: ConfigUtils.WaitTimeOut, reverse: true });
});

When(/^Kullanıcı giriş yapmıştır.$/, async function (): Promise<Chai.Assertion> {
    return expect(await PageObject.accountHover.isExisting(), 'Kullanıcı giriş yapamadı !').to.be.true;
});
