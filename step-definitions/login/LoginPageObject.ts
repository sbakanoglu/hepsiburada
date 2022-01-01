import Element = WebdriverIO.Element;

import WorldPageObject from '@web/shared/WorldPageObject';

export default class LoginPageObject extends WorldPageObject{

    public static get girisYapHover(): Element { return $(".user-info"); }
    public static get girisYapLink(): Element { return $("#login"); }

    public static get epostaInput(): Element { return $("#txtUserName"); }
    public static get girisYapButton(): Element { return $("#btnLogin"); }
    public static get sifreInput(): Element { return $("#txtPassword"); }
    public static get girisYapEmailButton(): Element { return $("#btnEmailSelect"); }
}
