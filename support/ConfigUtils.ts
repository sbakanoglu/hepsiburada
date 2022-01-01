import { join } from 'path';

import { Environment, Paths } from '@support/Types';
import Host from '@support/host/Host';
import HostFactory from '@support/host/HostFactory';
import Local from '@support/host/Local';
import SeleniumProd from '@support/host/Selenium-Prod';

class ConfigUtils {

    //region Variables

    private _env!: Environment;

    //endregion

    //region Properties

    public get env(): Environment {
        return this._env;
    }

    public set env(value: Environment) {
        this._env = value;
    }

    //endregion

    //region Timeouts

    public get ScriptTimeOut(): number {
        return 180000;
    }

    public get PageLoadTimeOut(): number {
        return 60000;
    }

    public get ImplicitTimeOut(): number {
        return 5000;
    }

    public get WaitShortTimeOut(): number {
        return 2000;
    }

    public get WaitTimeOut(): number {
        return 30000;
    }

    public get WaitLongTimeOut(): number {
        return 300000;
    }

    public get DownloadFileWaitTimeOut(): number {
        return 90000;
    }

    public get SixtySeconds(): number {
        return 60000;
    }

    //endregion

    //region Paths

    public get BaseDir(): string {
        return join(__dirname, '/../');
    }

    public get LogDir(): string {
        return join(__dirname, '/../log');
    }

    public get Paths(): Paths {
        return {
            allureExecutor: join(__dirname, '/../misc/allure-template/executor.json'),
            allureCategories: join(__dirname, '/../misc/allure-template/categories.json'),
            allureProperties: join(__dirname, '/../misc/allure-template/allure.properties'),
            allureResult: join(__dirname, '/../report/allure-results'),
            environmentJson: join(__dirname, '/../misc/temp/environment.json'),
            featuresSummary: join(__dirname, '/../misc/temp/featuresSummary.json'),
            reportZip: join(__dirname, '/../report/report.zip')
        };
    }

    //endregion
}

export default new ConfigUtils();
