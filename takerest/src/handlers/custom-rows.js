import s from 'strummer';
import {
    DataGenerator,
    simpleHandler
} from '../helpers';


let matcher = s.objectWithOnly({
    data: s.object(),
    rowsCount: s.oneOf([
        s.integer(),
        s.string()
    ])
});

let handler = simpleHandler(async (req) => {
    let params = {...req.body};

    return {
        data: DataGenerator.customRows({
            data: params.data,
            rowsCount: params.rowsCount
        })
    };
});


export default {
    matcher,
    handler
};