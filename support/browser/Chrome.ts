import Browser from '@support/browser/Browser';
import Host from '@support/host/Host';

export default class Chrome implements Browser {

    constructor(private host: Host) {

    }

    getMaxInstances(): number {
        return 1;
    }

    getBrowserName(): string {
        return "chrome";
    }

    getVersion(): string {
        return "86.0.4240.75";
    }

    getPlatform(): string {
        return 'Mac OS X';
    }

    getCapabilitiesName(): string {
        return "goog:chromeOptions";
    }

    getCapabilitiesValue(): any {
        return  {
            // to run chrome headless the following flags are required
            // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
            args: [
                '--disable-infobars',
                '--disable-web-security',
                '--disable-extensions',
                '--disable-dev-shm-usage',
                '--disable-notifications',
                '--ignore-certificate-errors'
            ],
            prefs: {
                'download': {
                    'directory_upgrade': true,
                    'prompt_for_download': false,
                    'default_directory': this.host.getDownloadDirectory()
                },
                "plugins.always_open_pdf_externally": true
            }
        };
    }
}
