var Exception = require("../helpers/exception");

module.exports = function (opts, type, isFloat) {

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

    var float = isFloat
        ? opts.float || Math.random() * (3 - 1) + 1
        : 0;

    var value = (type === 'min' || type === 'max')
        ? random(opts[type])
        : random(opts.min === opts.max
            ? opts.min
            : Math.floor(Math.random() * (opts.max - 1)) + opts.min
        );

    while (value[0] === "0") {
        value = value.substr(1) + "5";
    }

    if (float) {
        var floatValue = random(float);
        if (floatValue[floatValue.length - 1] === '0') {
            floatValue = parseInt(floatValue) + 5;
        }
        value += "." + floatValue;
    }

    value = signing(value, opts.sign || 'any');

    return float
        ? parseFloat(value)
        : parseInt(value);
};

function random(length) {
    var result = "";
    var possible = "0123456789";

    for (var i = 0; i < length; i++)
        result += possible.charAt(Math.floor(Math.random() * possible.length));

    return result;
}

function signing(value, sign) {
    if (sign === 'Positive') {
        return value;
    } else if (sign === 'Negative') {
        return -Math.abs(value);
    } else {
        return (Math.floor(Math.random() * 2) + 1) === 1
            ? value
            : -Math.abs(value);
    }
}