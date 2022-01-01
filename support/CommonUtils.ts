import ConfigUtils from '@support/ConfigUtils';
import { Environment } from '@support/Types';
import Cli from '@support/lib/Cli';
import AllureReport from '@support/report/AllureReport';
import Fs from '@support/lib/Fs';
import Dates from '@support/lib/Dates';

class CommonUtils {
    /**
     * Set Default Timeouts
     *
     * @link
        * https://webdriver.io/docs/timeouts.html
     * @returns {Promise<void>}
     */
    public setDefaultTimeouts(): void {
        browser.setTimeout({
            'implicit': ConfigUtils.ImplicitTimeOut,
            'pageLoad': ConfigUtils.PageLoadTimeOut,
            'script': ConfigUtils.ScriptTimeOut
        });
    }

    public async preSettings(): Promise<void> {
        Dates.changeLocale('en');
        const currentDate = Dates.getCurrentDate();

        const template: Environment = {
            ExecutionStartDate: currentDate,
            TestStatus: {
                PASSED: 0,
                FAILED: 0,
                SKIPPED: 0,
                PENDING: 0,
                FAILED_SCN: [],
                SKIPPED_SCN: [],
                PASSED_SCN: []
            }
        };

        if (Cli.get('isCID') !== 'true') {

            await Fs.writeFile(ConfigUtils.Paths.environmentJson, JSON.stringify(template));

            await AllureReport.cleanAllureReport();
        }

        ConfigUtils.env = JSON.parse(await Fs.readFile(ConfigUtils.Paths.environmentJson));
    }

    public async prepareReports() {
        ConfigUtils.env = JSON.parse(await Fs.readFile(ConfigUtils.Paths.environmentJson));
        ConfigUtils.env = this.sortReportDatas(ConfigUtils.env);

        const promise1 = new Promise<void>(async (resolve, reject): Promise<void> => {
            await AllureReport.generateAllureHtmlReport(resolve, reject);
        });

        await Promise.all([promise1]);
    }

    private sortReportDatas(ENV: Environment): Environment {
        ENV.TestStatus.FAILED_SCN.sort((a, b) => a.Environment.localeCompare(b.Environment) || a.Feature.localeCompare(b.Feature));
        ENV.TestStatus.PASSED_SCN.sort((a, b) => a.Environment.localeCompare(b.Environment) || a.Feature.localeCompare(b.Feature));
        ENV.TestStatus.SKIPPED_SCN.sort((a, b) => a.Environment.localeCompare(b.Environment) || a.Feature.localeCompare(b.Feature));

        return ENV;
    }
}

export default new CommonUtils();
