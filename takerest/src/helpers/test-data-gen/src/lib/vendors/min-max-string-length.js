var Exception = require("../helpers/exception");

module.exports = function (fn, opts, type) {

    if (opts.min < 0 || opts.min === 0) {
        throw new Exception("Min cannot be negative or 0.");
    }
    if (opts.max < 0 || opts.max === 0) {
        throw new Exception("Max cannot be negative or 0.");
    }
    if (opts.min && opts.max && opts.max < opts.min) {
        throw new Exception("Max cannot be less than min.");
    }

    var value = '',
        temp = '',
        cond = '',
        i = 0;

    do {
        i++;
        if (i === 10000) {
            return temp;
        }
        value = fn();

        if (type === 'min' || type === 'max') {
            if (opts[type] <= value.length) {
                temp = value.substring(0, opts[type]);
            } else if (opts[type] > value.length) {
                temp = value + random(opts[type] - value.length);
            } else {
                temp = value;
            }
            cond = value.length !== opts[type];
        } else {
            if (opts.min && opts.max) {
                cond = value.length <= opts.min || value.length >= opts.max;
                if (cond) {
                    temp = value.length <= opts.min
                        ? value + random(opts.min - value.length)
                        : (
                            value.length >= opts.max
                                ? value.substring(0, opts.max)
                                : value
                        )
                }
            } else if (opts.min && !opts.max) {
                cond = value.length <= opts.min;
                if (cond) {
                    temp = value + random(opts.min - value.length + between(opts.min, opts.max));
                }
            } else {
                cond = value.length >= opts.max;
                if (cond) {
                    temp = value.substring(0, opts.max);
                }
            }
        }

    } while (cond);

    return value;
};

function random(length) {
    var result = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < length; i++)
        result += possible.charAt(Math.floor(Math.random() * possible.length));

    return result;
}

function between(min, max) {
    min = min || 1;
    max = max || min + 10;
    return Math.random() * (max - min) + min;
}