var faker = require("faker");
var fakerator = require("fakerator")();
var minMaxStringLength = require('../vendors/min-max-string-length');


var name = {
    validator: {
        firstName: ["min", "max", "gender"],
        lastName: ["min", "max", "gender"],
        fullName: ["min", "max", "gender"],
        suffix: ["min", "max", "gender"],
        prefix: ["min", "max", "gender"],
        gender: ["min", "max", "gender"]
    },
    firstName: function (opts, type) {
        opts.gender = opts.gender && opts.gender !== 'unknown'
            ? opts.gender
            : 'male';

        var fn = opts.gender === 'female'
            ? fakerator.names.firstNameF
            : fakerator.names.firstNameM;

        if (opts.min || opts.max) {
            return minMaxStringLength(fn, opts, type)
        }

        return fn();
    },
    lastName: function (opts, type) {
        opts.gender = opts.gender && opts.gender !== 'unknown'
            ? opts.gender
            : 'male';

        var fn = opts.gender === 'male'
            ? fakerator.names.lastNameM
            : fakerator.names.lastNameF;

        if (opts.min || opts.max) {
            return minMaxStringLength(fn, opts, type)
        }

        return fn();
    },
    fullName: function (opts, type) {
        opts.gender = opts.gender && opts.gender !== 'unknown'
            ? opts.gender
            : 'male';

        var fn = opts.gender === 'male'
            ? fakerator.names.nameM
            : fakerator.names.nameF;

        if (opts.min || opts.max) {
            return minMaxStringLength(fn, opts, type)
        }

        return fn();
    },
    suffix: function (opts, type) {
        if (opts.min || opts.max) {
            return minMaxStringLength(faker.name.suffix, opts, type)
        }

        return faker.name.suffix();
    },
    prefix: function (opts, type) {
        if (opts.min || opts.max) {
            return minMaxStringLength(generatePrefix, opts, type)
        }

        return generatePrefix(opts);
    },
    gender: function (opts, type) {
        return opts.gender || ['male', 'female', 'unknown'][Math.floor(Math.random() * 3)];
    }
};

var generatePrefix = function (opts) {
    var prefixes = {
        male: ['Mr.'],
        female: ['Mrs.', 'Ms.', 'Miss'],
        unknown: ['Mx.']
    };

    if (!opts.gender) {
        opts.gender = 'male';
    }

    return prefixes[opts.gender][Math.floor(Math.random() * prefixes[opts.gender].length)];
};

module.exports = name;