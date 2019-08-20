import config from '../config';

import fs from 'fs';
import path from 'path';


/**
 * @description this is wrapper for handler which
 * - catch errors inside handler and forward it to app error handler
 * - simplify sending response
 *
 * @param fn
 * @returns {function(*=, *=, *)}
 */
export default ( fn ) => async (req, res, next) => {
    let nextCalled = false,
        nextWrapped = function(e) {
            nextCalled = true;
            next(e);
        };

    try {

        let result = await (fn || function(){})(req, res, nextWrapped);

        if(!nextCalled) {
            // var file = __dirname + "/../../data.json";
            // res.download(file);

            res.send(result);
        }
    } catch(e) {
        if (config.get('debug')) {
            console.log("error", {
                message: e.message,
                details: e.stack,
                status: e.status,
                code: e.code
            });
        }
        next(e);
    }
};
