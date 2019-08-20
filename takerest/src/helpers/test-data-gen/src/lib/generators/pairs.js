var Exception = require("../helpers/exception");
var PythonShell = require('python-shell');


var pairs = async function(data) {

    return PythonShell.run('create_allpairs.py', {
        scriptPath: __dirname + '/../vendors/pairs/main/',
        args: [JSON.stringify(data)]
    }, function (err, results) {
        if (err) return err;

        var result = [];
        Object.values(JSON.parse(results[0])).forEach(function (entity) {
            result.push(entity[0]);
        });

        return result;
    });
};

module.exports = pairs;