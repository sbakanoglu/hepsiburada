import Cli from '@support/lib/Cli';
import Browser from '@support/browser/Browser';
import Chrome from '@support/browser/Chrome';
import FireFox from '@support/browser/Firefox';
import Safari from '@support/browser/Safari';
import Host from '@support/host/Host';

class BrowserFactory {
    private static instance: BrowserFactory;

    createBrowser(host: Host): Browser {
        let browser: Browser = new Chrome(host);

        switch (Cli.get('browser')) {
            case "firefox":
                browser = new FireFox(host);
                break;
            case "safari":
                browser = new Safari(host);
                break;
        }

        return browser;
    }

    public static getInstance(): BrowserFactory {
        if (!BrowserFactory.instance)
            BrowserFactory.instance = new BrowserFactory();

        return BrowserFactory.instance;
    }
}

export default BrowserFactory;
