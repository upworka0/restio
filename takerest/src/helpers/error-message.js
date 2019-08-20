let mes = require('../errorMessages.json');


export default class ErrorMessage {

    constructor() {
        this.messages = mes;
    }

    get (key) {
        return this.messages[key];
    }

}