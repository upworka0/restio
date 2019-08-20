var faker = require("faker");

var currency = {
    validator: {
        currencyCode: ['currencyCode'],
        currencySymbol: ['currencyCode']
    },
    currencyCode: function (opts, type) {
        if (!opts.currencyCode) {
            var key = Object.keys(faker.definitions.finance.currency)
                    [Math.floor(Math.random() * (Object.keys(faker.definitions.finance.currency).length - 1))];
            opts.currencyCode = faker.definitions.finance.currency[key].code;
        }
        return opts.currencyCode;
    },
    currencySymbol: function (opts, type) {
        if (!opts.currencyCode) {
            var key = Object.keys(faker.definitions.finance.currency)
                [Math.floor(Math.random() * (Object.keys(faker.definitions.finance.currency).length - 1))];
            opts.currencyCode = faker.definitions.finance.currency[key].code;
        }
        var currencySymbol = '';
        Object.keys(faker.definitions.finance.currency).forEach(function (key) {
            if (faker.definitions.finance.currency[key].code === opts.currencyCode
                && faker.definitions.finance.currency[key].symbol
            ) {
                currencySymbol = faker.definitions.finance.currency[key].symbol;
            }
        });
        return currencySymbol;
    }
};

module.exports = currency;