var custom = {
    validator: {
        custom: ['value']
    },
    custom: function (opts, type, index) {
        var values = opts.value.split(',');
        return values[index % values.length];
    }
};

module.exports = custom;