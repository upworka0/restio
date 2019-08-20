var faker = require("faker");

var color = {
    validator: {
        color: []
    },
    color: function (opts, type) {
        return faker.commerce.color();
    }
};

module.exports = color;