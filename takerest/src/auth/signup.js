import s from 'strummer';
import {QueryAction} from '../dbconnect'
import {simpleHandler} from '../helpers'

let matcher = s.objectWithOnly({
    data: s.object()
});

let handler = simpleHandler(async (req, res) => {
    let params = {...req.body};
    let result = await QueryAction.registerUser({data: params.data})
    return result
});

export default {
    matcher,
    handler
};