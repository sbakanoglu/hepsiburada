interface Browser {
    getMaxInstances(): number;
    getBrowserName(): string;
    getVersion(): string;
    getPlatform(): string;
    getCapabilitiesName(): string
    getCapabilitiesValue(): any
}

export default Browser;