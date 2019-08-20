function DataGenerator() {
}

DataGenerator.prototype.combinations = require('./lib/generators/combinations');
DataGenerator.prototype.pairs = require('./lib/generators/pairs');
DataGenerator.prototype.dataType = require('./lib/data-types/data-type');


module.exports = DataGenerator;