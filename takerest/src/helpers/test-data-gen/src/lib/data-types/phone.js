var faker = require("faker");
var countryCodes = require('country-data');
var minMaxStringLength = require('../vendors/min-max-string-length');

var phone = {
    validator: {
        phoneCountryCode: [],
        phoneNumber: ["phoneFormat"]
    },
    phoneCountryCode: function (opts, type) {
        var country = countryCodes.countries[
            Object.keys(countryCodes.countries)[
                (Math.random() * Object.keys(countryCodes.countries).length).toFixed(0)
            ]
        ];

        return  country.countryCallingCodes[0];
    },
    phoneNumber: function (opts, type) {
        return faker.phone.phoneNumber(opts.phoneFormat || null);
    }
};

module.exports = phone;