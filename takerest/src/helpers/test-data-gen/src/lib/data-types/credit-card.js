var generator = require('creditcard-generator');

var creditCard = {
    validator: {
        cardType: ['cardType'],
        cardNumber: ['cardType']
    },
    cardType: function (opts, type) {
        if (!opts.cardType) {
            opts.cardType = types[Math.floor(Math.random() * (types.length - 1))];
        }
        return opts.cardType;
    },
    cardNumber: function (opts, type) {
        console.log(24321,opts, type)   
        
        if (!opts.cardType) {
            opts.cardType = types[Math.floor(Math.random() * (types.length - 1))];
        }
        return generator.GenCC(opts.cardType)[0];
    }
};

var types = ["VISA", "MasterCard", "Amex", "Diners", "Discover", "EnRoute", "JCB", "Voyager"];

module.exports = creditCard;