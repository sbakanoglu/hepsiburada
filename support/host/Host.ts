interface Host {
    getProtocol(): string;
    getHostname(): string;
    getPath(): string;
    getPort(): number;
    getDownloadDirectory(): string;
    getHostDownloadDirectory(): string;
    getUploadDirectory(): string;

    getServices(): any[];
}

export default Host;
