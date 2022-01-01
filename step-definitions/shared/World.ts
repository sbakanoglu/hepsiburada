import { Given, Then, When } from "@cucumber/cucumber";

import WorldPageObject from './WorldPageObject';
import ConfigUtils from "@support/ConfigUtils";

Given(/^İlgili "([^"]*)?" link açılır.$/, async function (link): Promise<void> {
    return WorldPageObject.open(link);
});

When(/^"([^"]*)?" ürün arama yerine yazılarak ara butonuna basılır.$/, async function (search): Promise<void> {
    await WorldPageObject.aramaInput.setValue(search);

    await WorldPageObject.aramaSuggest.waitForDisplayed({ timeout: ConfigUtils.WaitTimeOut });

    return await WorldPageObject.aramaButton.click();
});

When(/^Menüden "([^"]*)?" linkine tıklar.$/, async function (menu): Promise<void> {
    return await WorldPageObject.menuClick(menu);
});

Then(/^Çıkış yap.$/, async function (): Promise<void> {
    await WorldPageObject.accountHover.moveTo();

    return await WorldPageObject.kullaniciLogout.click();
});