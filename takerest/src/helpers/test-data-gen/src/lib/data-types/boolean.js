var faker = require("faker");

var boolean = {
    validator: {
        boolean: []
    },
    boolean: function (opts, type) {
        return faker.random.boolean();
    }
};

module.exports = boolean;