import _ from 'lodash';
import generator from 'test-data-gen';
let nameTypes = ['firstName', 'lastName', 'fullName', 'suffix', 'prefix', 'gender'];
let cardTypes = ['cardType', 'cardNumber'];
let currencyTypes = ['currencyCode', 'currencySymbol'];

export default class DataOpts {

     
     cardType = false;
     currencyCode = false;

    constructor(data) {
        this.data = data;
        this.gender = false;
    }

    optsResolve() {
        Object.keys(this.data).forEach(key => {
            nameTypes.indexOf(this.data[key].type) > -1 && this.genderResolve(key);
            cardTypes.indexOf(this.data[key].type) > -1 && this.cardTypeResolve(key);
            currencyTypes.indexOf(this.data[key].type) > -1 && this.currencyTypeResolve(key);
        });
        return this.data;
    }

    genderResolve(key) {
        if (!this.gender) {
            this.gender = generator.dataType.gender(_.clone(this.data[key]));
        }
        this.data[key].gender = this.gender;
    }

    cardTypeResolve(key) {
        if (!this.cardType) {
            this.cardType = generator.dataType.cardType(_.clone(this.data[key]));
        }
        this.data[key].cardType = this.cardType;
    }

    currencyTypeResolve(key) {
        if (!this.currencyCode) {
            this.currencyCode = generator.dataType.currencyCode(_.clone(this.data[key]));
        }
        this.data[key].currencyCode = this.currencyCode;
    }

}
