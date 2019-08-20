import Icon from 'vue-awesome/components/Icon'
import DataType from './rows';
import contentTypeConverter from "../../vendor/content-type-converter";

export default {
    name: 'DataTypeRows',
    props: ['url', 'rowsCountActive', 'maxValue'],
    components: {
        Icon,
        DataType
    },
    data: function () {
        return {
            fields: [],
            formats: ['JSON', 'CSV', 'XML'],
            format: "JSON",
            rowsCount: 10,
            max: 0
        }
    },
    mounted: function() {
        this.max = this.maxValue.max
        // console.log(this.maxValue.max)
    },
    methods: {
        add: function () {
            this.fields.push({
                parent: ""
            });
        },
        remove: function (index) {
            if(this.fields[index].type=='object'){
                this.fields.forEach(x=>{
                    if(x.parent==this.fields[index].name) delete x.parent;
                })
            }
            this.fields.splice(index, 1);            
        },
        selectTrigger: function() {
            // console.log(this.fields[0].type)
            let fieldTypes = this.fields.map(f => {
                return f.type
            })
            if(fieldTypes.indexOf('object') > -1) {
                this.formats = ['JSON', 'XML']
            }else{
                this.formats = ['JSON', 'CSV', 'XML']
            }
        },
        generate: function () {
            if(this.fields.length === 0) {
                alert('You have to generate a records at least.')
                return false
            }
            if(this.rowsCount > this.max) {
                alert('You may generate the records of ' + this.max + ' in maxinium.')
                return false
            }
            if (!this.validation(this.fields)) {
                alert('Please fill all properties!');
                return false;
            }
            this.sendRequest(dataResolve(this.fields), this.format);
        },
        validation: function (fields) {
            var error = false;
            fields.forEach((field) => {
                if (!field.name) {
                    error = true;
                    return false;
                }
                if (!field.type) {
                    error = true;
                    return false;
                }
            });
            return !error;
        },
        sendRequest: function (data, format) {
            let type = defineType(format);
            let payload = {data};
            // console.log('data;', payload)
            if (this.rowsCountActive) {
                payload.rowsCount = this.rowsCount;
            }
            this.$http.post(
                this.$config.get('api.url') + this.url, payload, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            ).then(response => {
                if (response.data.data) {
                    let blob = new Blob([contentTypeConverter(response.data.data, format)], {type});
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = `data.${type.split('/')[1]}`;
                    link.click();
                }
            }, response => {
                alert(response.body.message);
            });
        }
    },
    watch: {
        fields: function(f) { 
            if(f) {
                let fieldTypes = f.map(f => {
                    return f.type ? f.type : ''
                })
                // console.log(f)
                // console.log(fieldTypes)
                if(fieldTypes.indexOf('object') > -1) {
                    this.formats = ['JSON', 'XML']
                }else{
                    this.formats = ['JSON', 'CSV', 'XML']
                }
            }
        }
    }
}

let dataResolve = fields => {
    let data = {};
    fields.forEach(field => {
        // let _field = {name: field.name, type: field.type}
        // console.log('field;',field)
        if( field.min!=undefined&&field.min=='') delete field.min;
        if( field.max!=undefined&&field.max=='') delete field.max;
        data[field.name] = {...field};
    });
    return data;
};

let defineType = format => {
    let type;
    switch (format) {
        case 'JSON':
            type = 'application/json';
            break;
        case 'XML':
            type = 'text/xml';
            break;
        case 'CSV':
            type = 'text/csv';
            break;
    }
    return type;
};