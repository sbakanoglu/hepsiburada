import Element = WebdriverIO.Element;

import WorldPageObject from '@web/shared/WorldPageObject';

export default class ProductPageObject extends WorldPageObject{

    public static get urunWrapper(): Element { return $(".productListContent-wrapper"); }
    public static get urunList(): Element[] { return $$(".productListContent-wrapper > li"); }
    public static get saticiInfo(): Element { return $(".seller"); }
    public static get sepeteEkleButton(): Element { return $("#addToCart"); }

    public static get baskaSaticilar(): Element[] { return $$(".other-sellers .add-to-basket"); }

    public static get modalPopUp(): Element { return $(".voltran-body.AddToCart"); }
    public static get modalClose(): Element { return $("//div[contains(@class, 'voltran-body') and contains(@class, 'AddToCart')]/div/div/div/div/div/h1/a"); }
    public static get modalSuccess(): Element { return $("//div[contains(@class, 'voltran-body') and contains(@class, 'AddToCart')]/div/div/div/div/div/div[1]/div/div[1]/div[1]/div/span"); }
    public static get modalAlisveriseDevamEtButton(): Element { return $("//div[contains(@class, 'voltran-body') and contains(@class, 'AddToCart')]/div/div/div/div/div/div[1]/div/div[1]/div[2]/button[2]"); }

    public static randomProductPicker(productId): Element {
        return $(".productListContent-wrapper > li:nth-child("+ productId +") > div > a");
    }
}
