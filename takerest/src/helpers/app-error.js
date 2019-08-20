import _ from "lodash";
import httpStatus from "http-status";
import ErrorMessage from "./error-message";


let err = new ErrorMessage();


/**
 * @extends Error
 * @class ExtendableError
 */
class ExtendableError extends Error {

    constructor(message, status, details) {
        super(message);

        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.details = details;
        this.code = status;
    }

}


/**
 * Class representing an App error.
 * @extends ExtendableError
 * @class AppError
 */
class AppError extends ExtendableError {

    /**
     * Creates an API error.
     *
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {Array} details - Error details.
     */
    constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, details = [] ) {
        if (Array.isArray(message)) {
            message[0] = err.get(message[0]) || message[0];
            for (let i = 1; i < message.length; i++) {
                message[0] = _.replace(message[0], ':' + i, message[i]);
            }
            message = message[0];
        } else {
            message = err.get(message) || message;
        }
        super(message, status, details);
    }

}


export default AppError;
