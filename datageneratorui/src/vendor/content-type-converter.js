import js2xmlparser from 'js2xmlparser';
const Json2csvParser = require('json2csv').Parser;


export default function (data, format) {
    let result;
    switch (format) {
        case 'JSON': {
            result = JSON.stringify(data);
            break;
        }
        case 'XML': {
            result = js2xmlparser.parse("data", data);
            break;
        }
        case 'CSV': {
            let fields = Object.keys(data[0]);
            const json2csvParser = new Json2csvParser({ fields });
            result = json2csvParser.parse(data);
            break;
        }
    }
    return result;
}