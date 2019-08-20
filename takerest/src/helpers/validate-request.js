import APIError from './app-error';


export default (matcher) => (req, res, next) => { 
    let payload = {...req.body};

    let errors = matcher.match(payload);

    if (!errors.length) {
        return next();
    }

    return next(new APIError('Wrong Payload', 400, errors));
};