import { join } from "path";
import allure = require('allure-commandline');

import Cli from '@support/lib/Cli';
import ConfigUtils from '@support/ConfigUtils';
import Fs from '@support/lib/Fs';

class AllureReport {
    /**
     * Generate E2E tests report via AllureReport
     *
     * @param resolve
     * @param reject
     */
    public async generateAllureHtmlReport(resolve: any, reject: any): Promise<void> {
        if (Cli.get('genReport') !== 'true')
            return resolve();

        if (typeof Cli.get('buildUrl') !== 'undefined')
            await this.createAllureExecutor();

        await this.createAllureCategories();
        await this.createAllureProperties();

        // returns ChildProcess instance
        const generation = allure(['generate', ConfigUtils.Paths.allureResult]);

        generation.on('exit', (exitCode: number): void => {
            console.log('Generation is finished with code:', exitCode);

            if (exitCode === 1)
                reject(exitCode);
            else
                resolve(exitCode);
        });
    }

    /**
     *
     * @returns {Promise<void>}
     */
    private async createAllureExecutor(): Promise<void> {
        const executor = JSON.parse(await Fs.readFile(ConfigUtils.Paths.allureExecutor));
        const hostname = new URL(Cli.get('buildUrl')).hostname;

        executor.url = `http://${hostname}`;
        executor.buildOrder = Cli.get('buildNo');
        executor.buildName = `allure-report_deploy#${Cli.get('buildNo')}`;
        executor.buildUrl = Cli.get('buildUrl');
        executor.reportUrl = Cli.get('buildUrl');
        executor.reportName = Cli.get('reportName') || 'allure_report';

        await Fs.writeFile(`${ConfigUtils.Paths.allureResult}/executor.json`, JSON.stringify(executor));
    }

    /**
     *
     * @returns {Promise<void>}
     */
    private async createAllureCategories(): Promise<void> {
        const categories = JSON.parse(await Fs.readFile(ConfigUtils.Paths.allureCategories));

        await Fs.writeFile(`${ConfigUtils.Paths.allureResult}/categories.json`, JSON.stringify(categories));
    }

    /**
     *
     * @returns {Promise<void>}
     */
    private async createAllureProperties(): Promise<void> {
        await Fs.copy(ConfigUtils.Paths.allureProperties, `${ConfigUtils.Paths.allureResult}/allure.properties`);
    }

    /**
     *
     * @returns {Promise<*>}
     */
    public async cleanAllureReport(): Promise<void> {
        if (Cli.get('isCID') !== 'true')
            await Fs.emptyDir(ConfigUtils.Paths.allureResult);

        // const generation = allure(['generate', ConfigUtils.Paths.allureResult, '--clean']);

        if (await Fs.isFolder('allure-report/history'))
            await Fs.copy('allure-report/history', join(ConfigUtils.Paths.allureResult, '/history'));


        await Fs.remove('allure-report');
    }
}

export default new AllureReport();
