import s from 'strummer';
import {
    AppError,
    DataGenerator
} from '../helpers';


let matcher = s.objectWithOnly({
    data: s.object()
});

let handler = async (req, res, next) => {
    let params = { ...req.body };

    let PythonShell = await DataGenerator.pairs({
        data: params.data
    });

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    PythonShell.on('message', (message) => {
        let data = JSON.parse(message);
        let address = ["country", 'countryCode', 'state', 'stateCode', 'city', 'latitude', 'longitude']

        let map = [];
        let countryData = require('../helpers/country.json');
        let latlongData = require('../helpers/countrycode-latlong.json');
        let locales = require('../helpers/locales.js');
        let currencyData = require('../helpers/currency.json');

        let types = [];

        // console.log('inData;', data)
        data[0].forEach((value) => {
            types.push(value.type)
        });
        // console.log('types', types)

        Object.keys(data).forEach((key, i) => {
            let row = {};
            let result = [];
            let fieldName = []
            let clone = []
            let parent = [];
            let top = []

            let countries = []
            let states = []
            let state = {}
            let cityData = []
            let cities = []
            let city = {}
            let latlong = {}
            let country = {}
            let hasCountry = false
            let currency={}

            if (types.includes('country')) {
                hasCountry = true
                data[key].forEach((value, index) => {
                    // console.log(11,value.type)
                    // types.push(value.type)
                    if (value.type == 'country') {
                        if (value.min != undefined && value.max != undefined) {
                            countryData.forEach(x => {
                                if ((x.name.length >= value.min) && (x.name.length <= value.max)) countries.push(x)
                                // if (x.name.length == value.max) 
                            });

                        }
                        else if (value.min == undefined && value.max != undefined) {
                            countryData.forEach(x => {
                                if (x.name.length <= value.max) countries.push(x)
                            })
                        }
                        else if (value.min != undefined && value.max == undefined) {
                            countryData.forEach(x => {
                                if (x.name.length >= value.min) countries.push(x)
                            })

                        }
                        else countries = [...countryData]
                        if (countries.length == 0) country = ''
                        else country = countries[getRandomInt(countries.length)];

                    }

                });
                // console.log(11, countries)
                // console.log('country;', country)

                if (types.includes('city') || types.includes('zipCode')) {
                    if (country == '') city == '';
                    else {
                        while (!locales.includes(country.code2)) {
                            country = countries[getRandomInt(countries.length)];
                        }
                        cityData = require('../helpers/locales/' + country.code2)
                        city = cityData[getRandomInt(cityData.length)];
                        // 
                        // console.log('city;', city)
                        data[key].forEach((value, index) => {
                            // console.log(11,value.type)
                            // types.push(value.type)
                            console.log(country.code2)
                            if (value.type == 'city') {
                                if (value.min != undefined && value.max != undefined) {

                                    cityData.forEach(x => {
                                        // 
                                        if (x.city.length == undefined) return
                                        if (x.city.length >= value.min && x.city.length <= value.max) cities.push(x)
                                    })
                                }
                                else if (value.min == undefined && value.max != undefined) {
                                    cityData.forEach(x => {
                                        if (x.city.length == undefined) return
                                        if (x.city.length <= value.max) cities.push(x)
                                    })
                                }
                                else if (value.min != undefined && value.max == undefined) {
                                    cityData.forEach(x => {
                                        if (x.city.length == undefined) return
                                        if (x.city.length >= value.min) cities.push(x)
                                    })

                                }
                                else cities = [...cityData]
                                if (cities.length == 0) city = ''
                                else city = cities[getRandomInt(cities.length)];

                            }
                        });
                    }// console.log('country;', country)
                }
                // console.log('city;', city)
                if (types.includes('state') || types.includes('stateCode')) {
                    if (country == '' || country.states.length == 0) state = ''
                    else state = country.states[getRandomInt(country.states.length)];
                    // console.log('state;', state)

                    data[key].forEach((value, index) => {
                        // console.log(11,value.type)
                        // types.push(value.type)
                        if (value.type == 'state') {
                            if (country == '' || country.states.length == 0) state = ''
                            else {
                                if (value.min != undefined && value.max != undefined) {
                                    country.states.forEach(x => {
                                        if (x.name.length >= value.min && x.name.length <= value.max) states.push(x)
                                    })
                                }
                                else if (value.min == undefined && value.max != undefined) {
                                    country.states.forEach(x => {
                                        if (x.name.length <= value.max) states.push(x)
                                    })
                                }
                                else if (value.min != undefined && value.max == undefined) {
                                    country.states.forEach(x => {
                                        if (x.name.length >= value.min) states.push(x)
                                    })

                                }
                                else states = [...country.states]
                                if (states.length == 0) state = ''
                                else state = states[getRandomInt(states.length)];
                            }
                        }
                    });
                }
                // console.log('state;', state)

                // console.log('Types;', types)

                // console.log(22,country)
                // console.log('Entity;', entity)


                if (types.includes('latitude') || types.includes('longitude')) {
                    if (country == '') latlong = '';
                    else {
                        Object.keys(latlongData).forEach(x => {
                            if (x == country.code2.toLowerCase()) latlong = latlongData[x];
                        });
                    }
                }


            }
            if (types.includes('currencyCode') || types.includes('currencySymbol')) {
                currencyData = Object.values(currencyData)
                currency = currencyData[getRandomInt(currencyData.length)];
            }
            data[key].forEach((value, index) => {

                if (address.includes(value.type) && hasCountry && value.negative == undefined) {
                    switch (value.type) {
                        case 'country':
                            if (country == '') row[Object.keys(params.data)[index]] = ''
                            else row[Object.keys(params.data)[index]] = country.name;
                            break;
                        case 'state':
                            if (state == '') row[Object.keys(params.data)[index]] = ''
                            else row[Object.keys(params.data)[index]] = state.name;
                            break;
                        case 'countryCode':
                            if (country == '') row[Object.keys(params.data)[index]] = ''
                            else row[Object.keys(params.data)[index]] = country.code2;
                            break;
                        case 'stateCode':
                            if (state == '') row[Object.keys(params.data)[index]] = ''
                            else row[Object.keys(params.data)[index]] = state.code;
                            break;
                        case 'city':
                            if (city == '') row[Object.keys(params.data)[index]] = ''
                            else row[Object.keys(params.data)[index]] = city.city;
                            break;
                        case 'latitude':
                            if (latlong == '') row[Object.keys(params.data)[index]] = ''
                            else row[Object.keys(params.data)[index]] = latlong.lat;
                            break;
                        case 'longitude':
                            if (latlong == '') row[Object.keys(params.data)[index]] = ''
                            else row[Object.keys(params.data)[index]] = latlong.long;
                            break;
                        case 'zipCode':
                            if (city == '') row[Object.keys(params.data)[index]] = ''
                            else row[Object.keys(params.data)[index]] = city.zipCode;
                            break;
                    }
                }
                else if (value.type == 'currencyCode' && value.negative == undefined) row[Object.keys(params.data)[index]] = currency.code;
                else if (value.type == 'currencySymbol' && value.negative == undefined) row[Object.keys(params.data)[index]] = currency.symbol;
                else if (value.type == 'blank' && value.negative == undefined) row[Object.keys(params.data)[index]] = '';
                else if (value.type == 'phoneCountryCode' && value.negative == undefined) {
                    let phoneCountryCode = DataGenerator.dataGeneration(Object.assign({}, value), value.subtype);
                    row[Object.keys(params.data)[index]] = phoneCountryCode.slice(1, phoneCountryCode.length - 1);
                }
                else if (value.type == 'custom' && value.negative == undefined){
                    let intVal=parseInt( value.value)
                    row[Object.keys(params.data)[index]] =!isNaN(intVal) ? intVal:value.value;
                
                }
                else if (value.type == 'null' && value.negative == undefined) row[Object.keys(params.data)[index]] = null;

                else {
                    row[Object.keys(params.data)[index]] = 
                        DataGenerator.dataGeneration(Object.assign({}, value), value.subtype);
                }
                fieldName.push(value.name)
                clone.push(value.name)
                if (value.parent != undefined) {
                    parent.push(value.parent);
                }
                else {
                    parent.push('');
                    top.push(value.name)
                }
            });
            // console.log('row;',row)
            result.push(row);

            // console.log('result;', result)

            parent.forEach((x, i) => {
                if (clone.includes(x)) {
                    clone.splice(clone.indexOf(x), 1)
                }
            });
            let limit = clone.length

            for (let i = 0; i < limit; i++) {
                // console.log('clone:',clone)
                let x = clone[i]
                // console.log('x:',x)
                let cIndex = fieldName.indexOf(x)
                // console.log('fieldName;',fieldName)
                //     console.log('cindex;',cIndex)
                //     console.log('parent;',parent)
                if (parent[cIndex] != '') {
                    let pIndex = fieldName.indexOf(parent[cIndex]);

                    result[0][parent[cIndex]][x] = result[0][x];
                    clone.push(parent[cIndex])
                    limit++
                }
            }
            // console.log('result;', result)
            // console.log('top;', top)
            let obj = {}
            top.forEach((x, i) => {
                obj[x] = result[0][x];
            });

            map.push(obj);
            // console.log('map;', map)
            // }
        });
        res.send({
            data: map
        });

    });

    PythonShell.end(function (err, code, signal) {
        if (err)
            res.send({
                message: err.message
            }, 500);
    });
};


export default {
    matcher,
    handler
};

