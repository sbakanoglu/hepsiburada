import HostFactory from '@support/host/HostFactory';
import Host from '@support/host/Host';
import Browser from '@support/browser/Browser';
import BrowserFactory from '@support/browser/BrowserFactory';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config: any = require('./wdio.shared.conf').config;

const host: Host = HostFactory.createHost();
const browser: Browser = BrowserFactory.getInstance().createBrowser(host);

config.suites = {
    'Login': [
        'features/login/Login.feature',
    ],
    'Product': [
        'features/product/Product.feature',
    ]
};

config.cucumberOpts.require = [
    'step-definitions/**/*.ts'
];

config.capabilities = [{
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    // maxInstances: browser.getMaxInstances(),
    browserName: browser.getBrowserName()
}];

if (browser.getCapabilitiesName() != "")
    config.capabilities[0][browser.getCapabilitiesName()] = browser.getCapabilitiesValue();

config.services = host.getServices();

exports.config = config;
