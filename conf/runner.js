// region Basic configuration
// Basic configuration to run webdriverio
// @configuration-cli $ node node_modules/@wdio/cli/bin/wdio.js conf/runner.js --conf=wdio.web.conf --suite=Login
// @configuration-cli $ npx wdio conf/runner.js --conf=wdio.web.conf --suite=Login "--cucumberOpts.tags=@Prod" --cucumberOpts.name=Login
// endregion

let env = 'wdio.web.conf';

process.argv.forEach(function (element) {
    if (element.includes('--')) {
        const spl = element.replace('--', '').split('=');

        if (spl[0] === 'conf') env = spl[1];
    }
});

require('module-alias/register');

module.exports = require('./' + env);
