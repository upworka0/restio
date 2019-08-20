# Test Data Generator

## Install

    npm i test-data-gen

## Usage

### API Methods

#### Combinations

Combine all the possible combinations of two or more lists.

``` js
var generator = require('test-data-gen');

var data = {
    "points": [80],
    "name": ["Steve", "Adam"]
};

console.log(generator.combinations({data}));
/*
    outputs:
    {
        "data": [{
                "points": 80,
                "name": "Steve"
            },{
                "points": 80,
                "name": "Adam"
            }]
    }
*/  
```

#### Custom rows

Generating a lot of realistic test data.

``` js
var generator = require('test-data-gen');

var opts = {
    data: {
        "First name": {
            "type": "firstName"
        },
        "Last name": {
            "type": "lastName"
        },
        "Age": {
            "type": "integer",
            "min": 18,
            "max": 65
        }
    },
    "rowsCount": 2
};

console.log(generator.customRow(opts));
/*
    outputs:
    {
        "data": [{
                "First name": "Justyn",
                "Last name": "Rowe",
                "Age": 58
            },{
                "First name": "Jaylon",
                "Last name": "Weber",
                "Age": 22
            }]
    }
*/  
```

#### Data Type Generators

Use this functions to generate fake random data

* Name:
	* firstName (min, max)
	* lastName (min, max)
	* fullName (min, max)
	* prefix (min, max)
	* suffix (min, max)
  * gender
* Address:
	* country
	* countryCode
	* state
	* stateCode
	* county (min, max)
	* city (min, max)
	* addressPrimary (min, max)
	* addressSecondary (min, max)
	* zipCode (min, max)
	* latitude
	* longitude
* Internet:
	* email (min, max)
	* userName (min, max)
	* domainName (min, max)
	* ip
	* ipv6
  * url
* Number:
	* integer (min, max, sign)
	* float (min, max, float, sign)
  * incremental (start, step)
* Phone:
	* phoneCountryCode
	* phoneNumber (phoneFormat)
	* currentDate (dateFormat)
  * currentTime (timeFormat)
  * currentDateTime (dateFormat, timeFormat)
	* futureDate (dateFormat, days)
  * futureTime (timeFormat, mins)
  * futureDateTime (dateFormat, timeFormat, days, mins)
  * pastDate (dateFormat, days)
	* pastTime (timeFormat, mins)
  * pastDateTime (dateFormat, timeFormat, days, time)
  * rangeDate (dateFormat, from, to)
  * rangeTime (timeFormat, from, to)
  * rangeDateTime ( dateFormat, timeFormat, from, to)
	* timestamp (from, to)
* Time Zone:
	* timezone
* Boolean:
	* boolean
* Credit Card:
	* cardType
	* cardNumber
* Currency:
	* currencyCode
	* currencySymbol
* Text:
    * words (min, max)
    * sentences (min, max)
    * paragraphs (min, max)
* Color:
	* color
* Custom
  * custom
  * blank
