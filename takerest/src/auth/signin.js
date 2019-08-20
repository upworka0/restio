import s from 'strummer';
import { QueryAction } from '../dbconnect'
import { simpleHandler } from '../helpers'

let matcher = s.objectWithOnly({
    data: s.object()
});

let handler = simpleHandler(async(req) => {
    let params = {...req.body };
    let result = await QueryAction.getUser({ data: params.data })
    return result
});

export default {
    matcher,
    handler
};