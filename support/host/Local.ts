import { join } from 'path';

import Host from '@support/host/Host';
import ConfigUtils from '@support/ConfigUtils';

export default class Local implements Host {

    getDownloadDirectory(): string {
        return join(ConfigUtils.BaseDir, 'misc/downloads');
    }

    getHostDownloadDirectory(): string {
        return join(ConfigUtils.BaseDir, 'misc/downloads/');
    }

    getUploadDirectory(): string {
        return join(ConfigUtils.BaseDir, 'misc/uploads/');
    }

    getHostname(): string {
        return "";
    }

    getPort(): number {
        return 0;
    }

    getProtocol(): string {
        return 'http';
    }

    getServices(): any[] {
        return ["selenium-standalone"];
    }

    getPath(): string {
        return "";
    }
}
