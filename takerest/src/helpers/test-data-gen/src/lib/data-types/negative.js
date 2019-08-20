var faker = require("faker");

var negative = {
    validator: {
        aboveBelow: ["*"],
        spaces: ["*"],
        sqlInjection: ["*"],
        specialChars: ["*"],
        chars: ["*"],
        numbers: ["*"]
    },
    aboveBelow: function (opts, type) {
        // if (opts.min) {
        //     opts.min--;
        // }
        // if (opts.max) {
        //     opts.max++;
        // }
        // if (opts.from) {
        //     var dateFrom = new Date(opts.from);
        //     var formatted = moment(date).format('D MMMM YYYY');
        //     opts.from = dateFrom.subtract(Math.random() * (365 - 1) + 1, 'day')
        // }
        return faker.random.boolean();
    },
    spaces: function (opts, type) {
        var min = opts.min || 1;
        var max = opts.max || 10;
        return random('spaces', min, max, type);
    },
    sqlInjection: function (opts, type) {
        var sqls = ['SELECT * FROM employees WHERE name = :name;', '0 OR 1=1', '105 or 1=1', 'Yes OR No', 'SELECT * FROM accounts WHERE id = ?;', 'SELECT user_id, username, password_hash FROM users WHERE username = ?;', 'SELECT * FROM table WHERE userid = ?;', "SELECT * FROM users WHERE name = '' OR '1'='1';", "' OR '1'='1", "SELECT * FROM users WHERE name = '' OR '1'='1';", "$username = 1' or '1' = '1", "$password = 1' or '1' = '1", "$username = 1' or '1' = '1'))/*", "$username = 1' or '1' = '1')) LIMIT 1/*", "$Id=1' AND LENGTH(username)=N AND '1' = '1"];

        return sqls[Math.floor(Math.random() * sqls.length)];
    },
    specialChars: function (opts, type) {
        var min = opts.min || 1;
        var max = opts.max || 10;
        return random('special', min, max, type);
    },
    chars: function (opts, type) {
        var min = opts.min || 1;
        var max = opts.max || 10;
        return random('chars', min, max, type);
    },
    numbers: function (opts, type) {
        var min = opts.min || 1;
        var max = opts.max || 10;
        return random('numbers', min, max, type);
    }
};

function random(type, min, max, subtype) {
    var text = "";
    var possible = "";

    switch (type) {
        case 'chars':
            possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            break;
        case 'special':
            possible = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
            break;
        case 'spaces':
            possible = ' ';
            break;
        case 'numbers':
            possible = '1234567890';
            break;
    }

    let length = subtype === 'min'
        ? min
        : (subtype === 'max'
                ? max
                : (min !== max
                        ? Math.floor(Math.random() * max) + min
                        : min));

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = negative;
