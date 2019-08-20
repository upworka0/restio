var faker = require("faker");
var minMaxStringLength = require('../vendors/min-max-string-length');

var internet = {
    validator: {
        ip: [],
        ipv6: [],
        url: []
    },
    email: function (opts, type) {
        return genInternet('email', opts, type);
    },
    userName: function (opts, type) {
        return genInternet('userName', opts, type);
    },
    domainName: function (opts, type) {
        return genInternet('domainName', opts, type);
    },
    ip: function (opts, type) {
        return faker.internet.ip();
    },
    ipv6: function (opts, type) {
        return faker.internet.ipv6();
    },
    url: function (opts, type) {
        return faker.internet.url();
    }
};

var genInternet = function (type, opts, subtype) {
    if (opts.min || opts.max) {
        return minMaxStringLength(faker.internet[type], opts, subtype)
    }
    return faker.internet[type]();
};

module.exports = internet;