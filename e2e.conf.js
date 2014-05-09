
exports.config = {
    // (A)
    // requires `grunt connect` to be running
    //seleniumAddress: 'http://0.0.0.0:4444/wd/hub',

    // (B)
    seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.41.0.jar',
    seleniumPort: null,
    chromeDriver: 'node_modules/protractor/selenium/chromedriver',

    baseUrl: 'http://localhost:9000',

    capabilities: {
        'browserName': 'chrome'
    },
    specs: ['test/e2e/*.spec.js'],

    framework: 'mocha'
};