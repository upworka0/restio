var Exception = require('../helpers/exception');

var dataTypes = [].concat(
    require('./name'),
    require('./address'),
    require('./internet'),
    require('./number'),
    require('./phone'),
    require('./date-time'),
    require('./boolean'),
    require('./credit-card'),
    require('./currency'),
    require('./text'),
    require('./color'),
    require('./negative'),
    require('./custom'),
    require('./blank'),
    require('./object')
);

function DataType() {}

DataType.validator = ['min', 'max'];
DataType.ignore = ['negative', 'parent', 'subtype','locale'];

DataType.validate = function (opts, validator) {
    var self = this;
    if (validator.length && validator[0] === '*') {
        return true;
    }
    delete opts.type;
    delete opts.name;
   
    Object.keys(opts).forEach(function (key) {
        // console.log(key)
        if (self.ignore.indexOf(key) === -1 && validator.indexOf(key) === -1) {
            throw new Exception("Parameter '" + key + "' is not allowed");
        }
    })
};

DataType.make = function (fn, validator) {
    return function () {
        this.validate(arguments[0], validator);
        return fn.apply(this, arguments);
    }
};

DataType.init = function () {
    var self = this;
    dataTypes.forEach(function (dataType) {
        Object.keys(dataType).forEach(function (key) {
            if (typeof dataType[key] === 'function') {
                var validator = dataType.validator && dataType.validator[key]
                    ? dataType.validator[key]
                    : self.validator;
                self[key] = self.make(dataType[key], validator);
            }
        })
    });
};

DataType.init();


module.exports = DataType;