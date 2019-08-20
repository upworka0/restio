import s from 'strummer';
// import { QueryAction } from '../dbconnect'
import { simpleHandler } from '../helpers'

let matcher = s.objectWithOnly({
    data: s.object()
});

let handler = simpleHandler(async(req) => {
    let params = {...req.body };
    return params
});

export default {
    matcher,
    handler
};