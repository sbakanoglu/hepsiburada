import Browser from '@support/browser/Browser';
import Host from '@support/host/Host';

// You must enable the 'Allow Remote Automation' option
// sudo safaridriver --enable

export default class FireFox implements Browser {

    constructor(private host: Host) {

    }

    getMaxInstances(): number {
        return 1;
    }

    getBrowserName(): string {
        return "safari";
    }

    getVersion(): string {
        return "14.0";
    }

    getPlatform(): string {
        return 'Mac OS X';
    }

    getCapabilitiesName(): string {
        return "";
    }

    getCapabilitiesValue(): any {
        return  {
            // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
            args: [
                //'-headless'
            ],
            prefs: {
                'safari.options.dataDir': this.host.getDownloadDirectory()
            }
        };
    }
}
