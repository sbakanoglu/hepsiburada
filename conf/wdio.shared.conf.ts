import { Status } from "@cucumber/cucumber";

import whatwg from 'whatwg-url';
import CucumberReporter from '@espekkaya/wdio-cucumber-reporter';
import {sprintf} from "sprintf-js";
import Cli from '@support/lib/Cli';
import ConfigUtils from '@support/ConfigUtils';
import CommonUtils from '@support/CommonUtils';
import Fs from '@support/lib/Fs';

import { Scn } from '@support/Types';

Cli.getCliParams(); //  Get Cli Params

let cucumberTags = "not @Pending ";
if(typeof Cli.get("cucumberTags") != "undefined")
    cucumberTags += " and " + Cli.get("cucumberTags");

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    port: 4723,
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [// 'path/to/included/files'
    ], // Patterns to exclude.
    exclude: [// 'path/to/excluded/files'
    ], //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 1, //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [], //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',
    outputDir: ConfigUtils.LogDir,
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0, //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'https://www.hepsiburada.com', //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 60000, //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 90000, //
    // Default request retries count
    connectionRetryCount: 3, //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: [], //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber', //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: [CucumberReporter, ['allure', {
        outputDir: ConfigUtils.Paths.allureResult,
        disableWebdriverStepsReporting: true, // this is needed for cucumber reporter to work correctly
        disableWebdriverScreenshotsReporting: false, // needed for browser.saveScreenshot() in hooks
        useCucumberStepReporter: true // this does literally nothing right n
    }]], //
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: [],                        // <string[]> (file/dir) require files before executing features
        backtrace: false,                   // <boolean> show full backtrace for errors
        requireModule: [],                  // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,                      // <boolean> invoke formatters without executing steps
        failFast: false,                    // <boolean> abort the run on first failure
        format: ['pretty'],                 // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        snippets: true,                     // <boolean> hide step definition snippets for pending steps
        source: true,                       // <boolean> hide source uris
        profile: [],                        // <string[]> (name) specify the profile to use
        strict: true,                       // <boolean> fail if there are any undefined or pending steps
        tagExpression: cucumberTags,      // <string> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 240000,                     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false,  // <boolean> Enable this config to treat undefined definitions as warnings.
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: async function (config: WebdriverIO.Config, capabilities: WebDriver.DesiredCapabilities[]): Promise<void> {
        await CommonUtils.preSettings();
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    before: async function (capabilities: WebDriver.DesiredCapabilities, specs: string[]): Promise<void> {
        CommonUtils.setDefaultTimeouts();

        browser.maximizeWindow();
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Runs before a Cucumber feature
     */
    // beforeFeature: function (uri, feature) {
    // },
    /**
     * Runs before a Cucumber scenario
     */
    // beforeScenario: function (world) {
    // },
    /**
     * Runs before a Cucumber step
     */
    // beforeStep: function (step, context) {
    // },
    /**
     * Runs after a Cucumber step
     */
    // afterStep: function (step, context) {
    // },
    /**
     * Runs after a Cucumber scenario
     */
    afterScenario: async function (world: any): Promise<void> {
        const result: any = world.result;
        const feature: any = world.gherkinDocument.feature;
        const scenario: any = world.pickle;

        if(await Fs.isFile(ConfigUtils.Paths.environmentJson))
            ConfigUtils.env = JSON.parse(await Fs.readFile(ConfigUtils.Paths.environmentJson));

        const env = (whatwg.parseURL(await browser.getUrl())?.host) as string;

        const scn: Scn = {
            Feature: feature.name,
            Scenario: scenario.name,
            Environment: env
        };

        switch (result.status) {
            case Status.FAILED:
                ConfigUtils.env.TestStatus.FAILED += 1;
                ConfigUtils.env.TestStatus.FAILED_SCN.push(scn);

                const name = 'ERROR-' + Date.now();
                await browser.saveScreenshot(sprintf('report/allure-results/%s.png', name));
                break;

            case Status.SKIPPED:
                ConfigUtils.env.TestStatus.SKIPPED += 1;
                ConfigUtils.env.TestStatus.SKIPPED_SCN.push(scn);
                break;

            case Status.PENDING:
                ConfigUtils.env.TestStatus.PENDING += 1;
                break;

            case Status.PASSED:
                ConfigUtils.env.TestStatus.PASSED += 1;
                ConfigUtils.env.TestStatus.PASSED_SCN.push(scn);
                break;
        }

        return await Fs.writeFile(ConfigUtils.Paths.environmentJson, JSON.stringify(ConfigUtils.env));
    },
    /**
     * Runs after a Cucumber feature
     */
    // afterFeature: function (uri, feature) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: async function (config: WebdriverIO.Config, capabilities: WebDriver.DesiredCapabilities, specs: string[]): Promise<void> {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: async function (exitCode: number, config: WebdriverIO.Config, capabilities: WebDriver.DesiredCapabilities, result: WebdriverIO.Results): Promise<void> {
        await CommonUtils.prepareReports();
    },
    /**
     * Gets executed when a refresh happens.
     * @param {String} oldSessionId session ID of the old session
     * @param {String} newSessionId session ID of the new session
     */
    //onReload: function(oldSessionId, newSessionId) {
    //}
};
