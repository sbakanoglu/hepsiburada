import Element = WebdriverIO.Element;
import { sprintf } from "sprintf-js";

import ConfigUtils from '@support/ConfigUtils';

export default class WorldPageObject {

    public static get accountHover(): Element { return $("#myAccount"); }
    public static get kullaniciLogout (): Element {return $("//*[@id=\"myAccount\"]/div/div[2]/ul/li[9]/a");}

    public static get aramaInput (): Element {return $("//*[@id=\"SearchBoxOld\"]/div/div/div[1]/div[2]/input");}
    public static get aramaSuggest (): Element {return $("#react-autowhatever-1");}
    public static get aramaButton (): Element {return $("//*[@id=\"SearchBoxOld\"]/div/div/div[2]");}

    public static get menuSubLi(): string { return "//div[contains(@class, 'navigationBar')]/div/div/div/ul/li"; }
    public static get menuText(): string { return this.menuSubLi + "/span/span[text()='%s']"; }
    public static get menuSubText(): string { return "//span[text()='%s']"; }

    public static open(path: string): void {
        browser.url(path);
    }

    public static async menuClick(path: string): Promise<void> {
        const [mainMenu, subMenuChild] = path.split(' > ').map(function (item: string): string {
            return item.trim();
        });

        await $(sprintf(this.menuText, mainMenu)).waitForDisplayed({timeout: ConfigUtils.WaitTimeOut});
        await browser.pause(500);
        await $(sprintf(this.menuText, mainMenu)).click();
        await $(sprintf(this.menuText, mainMenu)).moveTo();
        await browser.pause(500);

        await $(this.menuSubLi).$(sprintf(this.menuSubText, subMenuChild)).waitForDisplayed({timeout: ConfigUtils.WaitTimeOut});
        await $(this.menuSubLi).$(sprintf(this.menuSubText, subMenuChild)).click();
    }

    public static generateRandomNumber = function (min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static clickPerform(elm: Element): void {
        browser.execute("arguments[0].click();", elm);
    }
}
