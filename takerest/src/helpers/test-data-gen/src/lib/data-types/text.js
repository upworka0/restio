var faker = require("faker");
var minMaxTextLength = require('../vendors/min-max-text-length');

var text = {
    words: function (opts, type) {
        return genText('words', opts, type);
        return faker.lorem.words((Math.random() * (max - min) + min).toFixed(0));
    },
    sentences: function (opts, type) {
        return genText('sentences', opts, type);
        return faker.lorem.sentences((Math.random() * (max - min) + min).toFixed(0));
    },
    paragraphs: function (opts, type) {
        return genText('paragraphs', opts, type);
        return faker.lorem.paragraphs((Math.random() * (max - min) + min).toFixed(0));
    }
};

var genText = function (type, opts, subtype) {
    return minMaxTextLength(faker.lorem[type], opts, subtype);
};

module.exports = text;