import s from 'strummer';
import {
    DataGenerator,
    simpleHandler
} from '../helpers';


let matcher = s.objectWithOnly({
    data: s.object()
});

let handler = simpleHandler(async (req) => {
    let params = {...req.body};

    return {
        data: DataGenerator.combinations({
            data: params.data
        })
    };
});


export default {
    matcher,
    handler
};