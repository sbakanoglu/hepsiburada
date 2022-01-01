import Host from '@support/host/Host';

export default class Selenium implements Host {

    getDownloadDirectory(): string {
        return '/home/seluser/Downloads';
    }

    getHostDownloadDirectory(): string {
        return '/var/jenkins_home/downloads/';
    }

    getUploadDirectory(): string {
        return '/home/seluser/uploads/';
    }

    getHostname(): string {
        return '10.100.33.196';
    }

    getPort(): number {
        return 4446;
    }

    getProtocol(): string {
        return 'http';
    }

    getServices(): any[] {
        return [];
    }

    getPath(): string {
        return '/wd/hub';
    }
}
