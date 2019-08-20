var faker = require('faker');
var minMaxNumbersLength = require('../vendors/min-max-numbers-length');

var number = {
    validator: {
        integer: ["min", "max"],
        float: ["min", "max", "float"],
        incremental: ["start", "step"]
    },
    integer: function (opts, type) {
        return faker.random.number({
            min: opts.min || -999999,
            max: opts.max || 999999
        });
    },
    float: function (opts, type) {
        var min = opts.min || -999999;
        var max = opts.max || 999999;
        var float = opts.float || Math.random() * (4 - 1) + 1;
        return (Math.random() * (max - min) + min).toFixed(float);
    },
    incremental: function (opts, type, index) {
        var start = opts.start || 1;
        var step = opts.step || 1;
        return (index * step) + start;
    }
};

module.exports = number;