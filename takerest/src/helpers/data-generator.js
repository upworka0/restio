import _ from 'lodash';
import generator from 'test-data-gen';
import AppError from './app-error';
import DataOpts from '../helpers/data-opts';


var countryData = require('./country.json');
let latlongData = require('./countrycode-latlong.json');
let locales = require('./locales.js');
let currencyData = require('./currency.json');

let options = ['min', 'max', 'from', 'to'];
let address = ["country", 'countryCode', 'state', 'stateCode', 'city', 'zipCode', 'latitude', 'longitude']

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
class DataGenerator {

    pairs(opts) {
        // console.log('Opts;',opts)
        let data = this.parewiseData(opts.data);
        // console.log('Data;',data)

        let mapped = [];
        Object.keys(data).forEach(key => {
            mapped.push(data[key]);
        });
        // console.log('mapped;', mapped)
        return generator.pairs(mapped);
    }

    combinations(opts) {
        // console.log('prepareData;', this.prepareData(opts.data))
        let data = generator.combinations(this.prepareData(opts.data));
        // console.log('Data;', data)
        let map = [];
        data.forEach(entity => {
            // for (let index = 0; index < Count; index++) {
            let fieldName = []
            let clone = []
            let mapped = [];
            let parent = [];
            let top = []
            let object = {};

            let countries = []
            let states = []
            let state = {}
            let cityData = []
            let cities = []
            let city = {}
            let latlong = {}
            let types = [];
            let country = {}
            let hasCountry = false
            let currency = {}

            Object.keys(entity).forEach((field) => {
                // 
                types.push(entity[field].type)
            });
            if (types.includes('country')) {
                hasCountry = true
                Object.keys(entity).forEach((field) => {
                    // console.log(11,entity[field].type)
                    // types.push(entity[field].type)
                    if (entity[field].type == 'country') {
                        if (entity[field].min != undefined && entity[field].max != undefined) {
                            countryData.forEach(x => {
                                if ((x.name.length >= entity[field].min) && (x.name.length <= entity[field].max)) countries.push(x)
                            });

                        }
                        else if (entity[field].min == undefined && entity[field].max != undefined) {
                            countryData.forEach(x => {
                                if (x.name.length <= entity[field].max) countries.push(x)
                            })
                        }
                        else if (entity[field].min != undefined && entity[field].max == undefined) {
                            countryData.forEach(x => {
                                if (x.name.length >= entity[field].min) countries.push(x)
                            })

                        }
                        else countries = [...countryData]
                        if (countries.length == 0) country = ''
                        else country = countries[getRandomInt(countries.length)];

                    }

                });
                // console.log('country;', country)
                if (types.includes('city') || types.includes('zipCode')) {
                    if (country == '') city == '';
                    else {
                        while (!locales.includes(country.code2)) {
                            country = countries[getRandomInt(countries.length)];
                        }
                        cityData = require('./locales/' + country.code2)
                        city = cityData[getRandomInt(cityData.length)];
                        // console.log('city;', city)
                        Object.keys(entity).forEach((field) => {
                            // console.log(country.code2)
                            if (entity[field].type == 'city') {
                                if (entity[field].min != undefined && entity[field].max != undefined) {

                                    cityData.forEach(x => {
                                        // 
                                        if (x.city.length == undefined) return
                                        if (x.city.length >= entity[field].min && x.city.length <= entity[field].max) cities.push(x)
                                    })
                                }
                                else if (entity[field].min == undefined && entity[field].max != undefined) {
                                    cityData.forEach(x => {
                                        if (x.city.length == undefined) return
                                        if (x.city.length <= entity[field].max) cities.push(x)
                                    })
                                }
                                else if (entity[field].min != undefined && entity[field].max == undefined) {
                                    cityData.forEach(x => {
                                        if (x.city.length == undefined) return
                                        if (x.city.length >= entity[field].min) cities.push(x)
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

                    Object.keys(entity).forEach((field) => {
                        if (entity[field].type == 'state') {
                            if (country == '' || country.states.length == 0) state = ''
                            else {
                                if (entity[field].min != undefined && entity[field].max != undefined) {
                                    country.states.forEach(x => {
                                        if (x.name.length >= entity[field].min && x.name.length <= entity[field].max) states.push(x)
                                    })
                                }
                                else if (entity[field].min == undefined && entity[field].max != undefined) {
                                    country.states.forEach(x => {
                                        if (x.name.length <= entity[field].max) states.push(x)
                                    })
                                }
                                else if (entity[field].min != undefined && entity[field].max == undefined) {
                                    country.states.forEach(x => {
                                        if (x.name.length >= entity[field].min) states.push(x)
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
                currency = currencyData[getRandomInt(currencyData.length)]
            }
            Object.keys(entity).forEach(field => {
                object = {};
                if (address.includes(entity[field].type) && hasCountry && entity[field].negative == undefined) {
                    switch (entity[field].type) {
                        case 'country':
                            if (country == '') object[field] = ''
                            else object[field] = country.name;
                            break;
                        case 'state':
                            if (state == '') object[field] = ''
                            else object[field] = state.name;
                            break;
                        case 'countryCode':
                            if (country == '') object[field] = ''
                            else object[field] = country.code2;
                            break;
                        case 'stateCode':
                            if (state == '') object[field] = ''
                            else object[field] = state.code;
                            break;
                        case 'city':
                            if (city == '') object[field] = ''
                            else object[field] = city.city;
                            break;
                        case 'latitude':
                            if (latlong == '') object[field] = ''
                            else object[field] = latlong.lat;
                            break;
                        case 'longitude':
                            if (latlong == '') object[field] = ''
                            else object[field] = latlong.long;
                            break;
                        case 'zipCode':
                            if (city == '') object[field] = ''
                            else object[field] = city.zipCode;
                            break;
                    }
                }
                else if (entity[field].type == 'currencyCode' && entity[field].negative == undefined) object[field] = currency.code;
                else if (entity[field].type == 'currencySymbol' && entity[field].negative == undefined) object[field] = currency.symbol;
                else if (entity[field].type == 'blank' && entity[field].negative == undefined) object[field] = '';
                else if (entity[field].type == 'phoneCountryCode' && entity[field].negative == undefined) {
                    let phoneCountryCode = this.dataGeneration(_.clone(entity[field]), entity[field].subtype);
                    object[field] = phoneCountryCode.slice(1, phoneCountryCode.length - 1);
                }
                else if (entity[field].type == 'custom' && entity[field].negative == undefined){ 
                    // console.log(222,parseInt(entity[field].value))
                    if(isNaN(parseInt(entity[field].value)))  object[field] = entity[field].value;
                    else object[field] =parseInt(entity[field].value)

                }
                else if (entity[field].type == 'null' && entity[field].negative == undefined) object[field] = null;
                else {
                    object[field] = this.dataGeneration(_.clone(entity[field]), entity[field].subtype);
                }
                mapped.push(object);
                fieldName.push(entity[field].name)
                clone.push(entity[field].name)
                if (entity[field].parent != undefined) {
                    parent.push(entity[field].parent);
                } else {
                    parent.push('');
                    top.push(entity[field].name)
                }
            });
            // console.log('mapped;', mapped)
            parent.forEach((x, i) => {
                if (clone.includes(x)) {
                    clone.splice(clone.indexOf(x), 1)
                }
            });
            // console.log('clone:', clone)
            let limit = clone.length
            for (let i = 0; i < limit; i++) {
                let x = clone[i]
                let cIndex = fieldName.indexOf(x)
                // console.log('fieldName;', fieldName)
                // console.log('cindex;', cIndex)
                if (parent[cIndex] != '') {
                    let pIndex = fieldName.indexOf(parent[cIndex])
                    mapped[pIndex][parent[cIndex]][x] = mapped[cIndex][x]
                    clone.push(parent[cIndex])
                    limit++
                }
            }
            let obj = {}
            top.forEach((x, i) => {
                let j = fieldName.indexOf(x)
                let prop = Object.keys(mapped[j])[0]
                obj[prop] = mapped[j][prop]
            })
            map.push(obj)

            // }
        });
        return map;
    }

    customRows(opts) {

        let data = [];
        for (let i = 0; i < opts.rowsCount; i++) {
            let row = {};
            let resolvedData = (new DataOpts(_.cloneDeep(opts.data))).optsResolve();

            let fieldName = []
            let clone = []
            let parent = [];
            let map = [];
            let top = []

            let countries = []
            let states = []
            let state = {}
            let cityData = []
            let cities = []
            let city = {}
            let latlong = {}
            let types = [];
            let country = {}
            let hasCountry = false
            let currency = {}
            Object.keys(resolvedData).forEach(key => {
                types.push(resolvedData[key].type)
            });
            if (types.includes('country')) {
                hasCountry = true
                Object.keys(resolvedData).forEach((key) => {
                    if (resolvedData[key].type == 'country') {
                        if (resolvedData[key].min != undefined && resolvedData[key].max != undefined) {
                            countryData.forEach(x => {
                                if ((x.name.length >= resolvedData[key].min) && (x.name.length <= resolvedData[key].max)) {
                                    countries.push(x)
                                }
                               
                            });

                        }
                        else if (resolvedData[key].min == undefined && resolvedData[key].max != undefined) {
                            countryData.forEach(x => {
                                if (x.name.length <= resolvedData[key].max) countries.push(x)
                            })
                        }
                        else if (resolvedData[key].min != undefined && resolvedData[key].max == undefined) {
                            countryData.forEach(x => {
                                if (x.name.length >= resolvedData[key].min) countries.push(x)
                            })

                        }
                        else countries = [...countryData]
                        if (countries.length == 0) country = ''
                        else country = countries[getRandomInt(countries.length)];

                    }

                });
                // console.log('country;', country)

                if (types.includes('city') || types.includes('zipCode')) {
                    if (country == '') city == '';
                    else {
                        while (!locales.includes(country.code2)) {
                            country = countries[getRandomInt(countries.length)];
                        }
                        cityData = require('./locales/' + country.code2)
                        city = cityData[getRandomInt(cityData.length)];
                        // 
                        // console.log('city;', city)
                        Object.keys(resolvedData).forEach((key) => {
                            // console.log(country.code2)
                            if (resolvedData[key].type == 'city') {
                                if (resolvedData[key].min != undefined && resolvedData[key].max != undefined) {

                                    cityData.forEach(x => {
                                        // 
                                        if (x.city.length == undefined) return
                                        if (x.city.length >= resolvedData[key].min && x.city.length <= resolvedData[key].max) cities.push(x)
                                    })
                                }
                                else if (resolvedData[key].min == undefined && resolvedData[key].max != undefined) {
                                    cityData.forEach(x => {
                                        if (x.city.length == undefined) return
                                        if (x.city.length <= resolvedData[key].max) cities.push(x)
                                    })
                                }
                                else if (resolvedData[key].min != undefined && resolvedData[key].max == undefined) {
                                    cityData.forEach(x => {
                                        if (x.city.length == undefined) return
                                        if (x.city.length >= resolvedData[key].min) cities.push(x)
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
                    else {
                        Object.keys(resolvedData).forEach((key) => {
                            if (resolvedData[key].type == 'state') {
                                if (country == '' || country.states.length == 0) state = ''
                                else {
                                    if (resolvedData[key].min != undefined && resolvedData[key].max != undefined) {
                                        country.states.forEach(x => {
                                            if (x.name.length >= resolvedData[key].min && x.name.length <= resolvedData[key].max) states.push(x)
                                        })
                                    }
                                    else if (resolvedData[key].min == undefined && resolvedData[key].max != undefined) {
                                        country.states.forEach(x => {
                                            if (x.name.length <= resolvedData[key].max) states.push(x)
                                        })
                                    }
                                    else if (resolvedData[key].min != undefined && resolvedData[key].max == undefined) {
                                        country.states.forEach(x => {
                                            if (x.name.length >= resolvedData[key].min) states.push(x)
                                        })

                                    }
                                    else states = [...country.states]
                                    if (states.length == 0) state = ''
                                    else state = states[getRandomInt(states.length)];
                                }
                            }
                        });
                    }
                }
                // console.log('state;', state)
                // console.log('Types;', types)
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
                currency = currencyData[getRandomInt(currencyData.length)]
            }
            // console.log('cities;', city)
            // console.log('country;', country.name, country.code2)
            // console.log('Data;', resolvedData)

            Object.keys(resolvedData).forEach(key => {
                if (!resolvedData[key].type) {
                    throw new AppError(['PROVIDE_TYPE', key]);
                }
                else if (address.includes(resolvedData[key].type) && hasCountry && resolvedData[key].negative == undefined) {
                    switch (resolvedData[key].type) {
                        case 'country':
                            if (country == '') row[key] = ''
                            else row[key] = country.name;
                            break;
                        case 'state':
                            if (state == '') row[key] = ''
                            else row[key] = state.name;
                            break;
                        case 'countryCode':
                            if (country == '') row[key] = ''
                            else row[key] = country.code2;
                            break;
                        case 'stateCode':
                            if (state == '') row[key] = ''
                            else row[key] = state.code;
                            break;
                        case 'city':
                            if (city == '') row[key] = ''
                            else row[key] = city.city;
                            break;
                        case 'latitude':
                            if (latlong == '') row[key] = ''
                            else row[key] = latlong.lat;
                            break;
                        case 'longitude':
                            if (latlong == '') row[key] = ''
                            else row[key] = latlong.long;
                            break;
                        case 'zipCode':
                            if (city == '') row[key] = ''
                            else row[key] = city.zipCode;
                            break;
                    }
                }
                else if (resolvedData[key].type == 'currencyCode' && resolvedData[key].negative == undefined) row[key] = currency.code;
                else if (resolvedData[key].type == 'currencySymbol' && resolvedData[key].negative == undefined) row[key] = currency.symbol;
                else if (resolvedData[key].type == 'blank' && resolvedData[key].negative == undefined) row[key] = '';
                else if (resolvedData[key].type == 'phoneCountryCode' && resolvedData[key].negative == undefined) {
                    let phoneCountryCode = this.dataGeneration(_.clone(resolvedData[key]), null, i);
                    row[key] = phoneCountryCode.slice(1, phoneCountryCode.length - 1);
                }
                else if (resolvedData[key].type == 'custom' && resolvedData[key].negative == undefined){
                    let customValues=  resolvedData[key].value.split(',');
                     row[key] =isNaN(parseInt(customValues[i%customValues.length]))?customValues[i%customValues.length]:parseInt(customValues[i%customValues.length])
                }
                else if (resolvedData[key].type == 'null' && resolvedData[key].negative == undefined) row[key] = null;
                else if (i === 0 && resolvedData[key].min) {
                    row[key] = this.dataGeneration(_.clone(resolvedData[key]), 'min', i);
                }
                else if ((i === 0 || (i === 1 && resolvedData[key].min) && resolvedData[key].max)) {
                    row[key] = this.dataGeneration(_.clone(resolvedData[key]), 'max', i);
                }
                else {
                    // console.log('custom;', resolvedData[key], i)
                    row[key] = this.dataGeneration(_.clone(resolvedData[key]), null, i);
                }
                fieldName.push(resolvedData[key].name)
                clone.push(resolvedData[key].name)
                if (resolvedData[key].parent != undefined) {
                    parent.push(resolvedData[key].parent);
                } else {
                    parent.push('');
                    top.push([resolvedData[key].name, resolvedData[key].type])
                }
            });
            parent.forEach((x, i) => {
                if (clone.includes(x)) {
                    clone.splice(clone.indexOf(x), 1)
                }
            });

            let limit = clone.length
            for (let i = 0; i < limit; i++) {
                //  console.log('clone:',clone)
                let x = clone[i]
                let cIndex = fieldName.indexOf(x)
                // console.log('fieldName;',fieldName)
                // console.log('cindex;',cIndex)
                // console.log('parent;',parent)
                if (parent[cIndex] != '') {

                    let pIndex = fieldName.indexOf(parent[cIndex])
                    row[parent[cIndex]][x] = row[x]
                    clone.push(parent[cIndex])
                    limit++
                }
            }
            let obj = {}
            top.forEach((x, i) => {
                obj[x[0]] = row[x[0]];
                map = (obj);
            })
            data.push(map);
            // }
        }
        return this.parentResolve(opts, data);
    }

    prepareData(data) {
        // console.log('data;', data)
        let map = {};
        Object.keys(data).forEach(name => {
            let obj;
            if (!map[name]) {
                map[name] = [];
            }
            Object.keys(data[name]).forEach(key => {
                if (options.indexOf(key) > -1) {
                    obj = _.cloneDeep(data[name]);
                    obj.subtype = key;
                    map[name].push(obj);
                }
            });
            if (data[name].type === 'custom') {
                // map[name] = data[name].value.split(',');
                let array = data[name].value.split(',');
                array.forEach(key => {
                    obj = _.cloneDeep(data[name]);
                    obj.value = key
                    map[name].push(obj);
                });

            }
            else {
                obj = _.cloneDeep(data[name]);
                obj.subtype = 'positive';
                map[name].push(obj);
            }
        });
        return map;
    }
    parewiseData(data) {
        let map = {};
        Object.keys(data).forEach(name => {
            let obj;
            if (!map[name]) {
                map[name] = [];
            }
            let state = false
            Object.keys(data[name]).forEach(key => {
                if (options.indexOf(key) > -1) {
                    obj = _.cloneDeep(data[name]);
                    obj.subtype = key;
                    map[name].push(obj);
                    state = true
                }
            });
            if (data[name].type === 'custom') {
                // map[name] = data[name].value.split(',');
                let array = data[name].value.split(',');
                array.forEach(key => {
                    obj = _.cloneDeep(data[name]);
                    obj.value = key
                    map[name].push(obj);
                });
            }
            else if (!state) {
                obj = _.cloneDeep(data[name]);
                obj.subtype = 'positive';
                map[name].push(obj);
            }
        });

        return map;
    }

    dataGeneration(opts, type, index) {
        if (opts.negative && opts.negative.length) {
            return this.resolveNegative(opts, type, index);
        }
        return this.resolveDataType(opts, type, index);
    }

    resolveDataType(opts, type, index) {
        if (typeof generator.dataType[opts.type] !== "function") {
            throw new AppError(['PROVIDE_VALID_TYPE', opts.type]);
        }

        return generator.dataType[opts.type](opts, type, index);
    }

    resolveNegative(opts, type, index) {
        let negative = opts.negative[Math.floor(Math.random() * opts.negative.length)];
        let negatives = {
            'Above/Below': 'aboveBelow',
            'Spaces': 'spaces',
            'SQL injection': 'sqlInjection',
            'Special Chars': 'specialChars',
            'Numbers': 'numbers',
            'Chars': 'chars'
        };
        return generator.dataType[negatives[negative]](opts, type, index);
    }

    parentResolve(opts, data) {
        return data;
    }

}

export default new DataGenerator();