var fakerator = require("fakerator");
var moment = require("moment");
var Exception = require("../helpers/exception");

var timeFormats = ["HH:mm", "hh:mm a", "HH:mm:ss", "HH:mm:ss:SSS", "HH:mm:ss.SSSZ"];

var dateTime = {
    validator: {
        currentDate: ["dateFormat"],
        currentTime: ["timeFormat"],
        currentDateTime: ["dateFormat", "timeFormat"],
        futureDate: ["dateFormat", "days"],
        futureTime: ["timeFormat", "mins"],
        futureDateTime: ["dateFormat", "timeFormat", "days", "mins"],
        pastDate: ["dateFormat", "days"],
        pastTime: ["timeFormat", "mins"],
        pastDateTime: ["dateFormat", "timeFormat", "days", "mins"],
        rangeDate: ["dateFormat", "from", "to"],
        rangeTime: ["timeFormat", "from", "to"],
        rangeDateTime: ["dateFormat", "timeFormat", "from", "to"],
        timestamp: ['from', 'to'],
        timezone: []
    },
    currentDate: function (opts, type) {
        return current('date', opts);
    },
    currentTime: function (opts, type) {
        return current('time', opts);
    },
    currentDateTime: function (opts, type) {
        return current('dateTime', opts);
    },
    futureDate: function (opts, type) {
        return future('date', opts);
    },
    futureTime: function (opts, type) {
        return future('time', opts);
    },
    futureDateTime: function (opts, type) {
        return future('dateTime', opts);
    },
    pastDate: function (opts, type) {
        return past('date', opts);
    },
    pastTime: function (opts, type) {
        return past('time', opts);
    },
    pastDateTime: function (opts, type) {
        return past('dateTime', opts);
    },
    rangeDate: function (opts, type) {
        return range('date', opts);
    },
    rangeTime: function (opts, type) {
        return range('time', opts);
    },
    rangeDateTime: function (opts, type) {
        return range('dateTime', opts);
    },
    timestamp: function (opts, type) {
        if (!opts.from || !opts.to) {
            throw new Exception("Provide both from/to parameters");
        }

        var diff = moment(opts.to).diff(opts.from, "minutes");

        if (diff < 0) {
            throw new Exception("Parameter 'to' must be more than 'from'");
        }

        return moment(opts.from).add(Math.random() * (diff - 1) + 1, 'minutes').format('X');
    },
    timezone: function (opts, type) {
        return (fakerator()).date.timezone();
    }
};

var current = function (type, opts) {
    return moment().format(getFormat(type, opts));
};

var future = function (type, opts) {
    var now = moment();

    if (type === "date" || type === "dateTime") {
        now = now.add(opts.days || Math.random() * (365 - 1) + 1, 'day');
    }

    if (type === "time" || type === "dateTime") {
        now = now.add(opts.mins || Math.random() * (720 - 1) + 1, 'minutes');
    }

    return now.format(getFormat(type, opts));
};

var past = function (type, opts) {
    var now = moment();

    if (type === "date" || type === "dateTime") {
        now = now.subtract(opts.days || Math.random() * (365 - 1) + 1, 'day');
    }

    if (type === "time" || type === "dateTime") {
        now = now.subtract(opts.mins || Math.random() * (720 - 1) + 1, 'minutes');
    }

    return now.format(getFormat(type, opts));
};

var range = function (type, opts) {
    if (!opts.from || !opts.to) {
        throw new Exception("Provide both from/to parameters");
    }

    var diff = 0;
    if (type === 'time') {
        diff = moment(moment().format("MM-DD-YYYY") + " " + opts.to).diff(moment().format("MM-DD-YYYY") + " " + opts.from, "minutes");
    } else {
        diff = moment(opts.to).diff(opts.from, "minutes");
    }

    if (diff < 0) {
        throw new Exception("Parameter 'to' must be more than 'from'");
    }

    if (type === 'time') {
        return moment(moment().format("MM-DD-YYYY") + " " + opts.from).add(Math.floor(Math.random() * diff) + 1, 'minutes').format(getFormat(type, opts));
    } else {
        return moment(opts.from).add(Math.floor(Math.random() * diff) + 1, 'minutes').format(getFormat(type, opts));
    }
};

var getFormat = function (type, opts) {
    var dateFormat = resolveDateFormat(opts.dateFormat);
    var timeFormat = resolveTimeFormat(opts.timeFormat);
    return ((type !== "time" ? dateFormat + " " : "")
        + (type !== "date" ? timeFormat : "")).trim();
};

var resolveDateFormat = function (format) {
    return format
        ? format.replace('d', 'DD').replace('m', 'MM').replace('Y', 'YYYY')
        : "MM-DD-YYYY";
};

var resolveTimeFormat = function (format) {
    // return format
    //     // ? (format === "12h"
    //     //     ? timeFormats[1]
    //     //     : timeFormats[0])
    //     // : timeFormats[1];
        if (format == "HH:mm") {
            format = timeFormats[0];
        } else if (format == "hh:mm a") {
            format = timeFormats[1];
        } else if (format == "HH:mm:ss") {
            format = timeFormats[2];
        } else if (format == "HH:mm:ss:sss") {
            format = timeFormats[3];
        } else {
            format = timeFormats[4];
        }
    return format;
};

module.exports = dateTime;
