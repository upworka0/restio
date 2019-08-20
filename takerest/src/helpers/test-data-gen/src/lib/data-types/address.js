var faker = require("faker");

var minMaxStringLength = require('../vendors/min-max-string-length');

var address = {
    validator: {
        countryCode: ['country'],
        stateCode: ['state'],
        latitude: [],
        longitude: []
    },
    country: function (opts, type) {
        return genAddress('country', opts, type);
    },
    countryCode: function (opts, type) {
        faker.locale=opts.locale;    
        return faker.address.countryCode();
    },
    state: function (opts, type) {
        return genAddress('state', opts, type);
    },
    stateCode: function (opts, type) {
        faker.locale=opts.locale;    
        return faker.address.stateAbbr();
    },
    county: function (opts, type) {
        return genAddress('county', opts, type);
    },
    city: function (opts, type) {
        return genAddress('city', opts, type);
    },
    addressPrimary: function (opts, type) {
        return genAddress('streetName', opts, type);
    },
    addressSecondary: function (opts, type) {
        return genAddress('secondaryAddress', opts, type);
    },
    zipCode: function (opts, type) {
        return genAddress('zipCode', opts, type);
    },
    latitude: function (opts, type) {
        faker.locale=opts.locale;
    
        return faker.address.latitude();
    },
    longitude: function (opts, type) {
        faker.locale=opts.locale;
    
        return faker.address.longitude();
    }
};

var genAddress = function (type, opts, subtype) {
    faker.locale=opts.locale;
    
   if(! Object.keys(faker.address).includes(type)) return '';
    
    
    if (opts.min || opts.max) {
        return minMaxStringLength(faker.address[type], opts, subtype)
    }
    return faker.address[type]();
};
module.exports = address;