var Exception = require("../helpers/exception");

module.exports = function (fn, opts, type) {

    if (opts.min <= 0) {
        throw new Exception("Min cannot be negative or 0.");
    }
    if (opts.max <= 0) {
        throw new Exception("Max cannot be negative or 0.");
    }
    if (opts.min && opts.max && opts.max < opts.min) {
        throw new Exception("Max cannot be less than min.");
    }

    if (!opts.min) {
        if (!opts.max) {
            opts.max = 10;
        }
        opts.min = Math.floor(Math.random() * opts.max) + 1;
    } else if (!opts.max) {
        opts.max = Math.floor(Math.random() * (opts.min + 5)) + opts.min;
    }

    var value = (type === 'min' || type === 'max')
        ? fn(opts[type])
        : fn(opts.min === opts.max
            ? opts.min
            : Math.floor(Math.random() * opts.max) + opts.min
        );

    return value;
};