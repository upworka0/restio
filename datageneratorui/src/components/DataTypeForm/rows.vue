<template>
    <tr class="item">
        <td>
            <input class="form-control" v-model="field.name">
        </td>
        <td>
            <!-- <v-select :class="field.type ? 'active' : ''" v-model="field.type" :options="Object.keys(dataTypes)"></v-select> -->
            <div class="form-group">
                <select class="form-control" :class="field.type ? 'active' : ''" v-model="field.type">
                    <optgroup :label="optgroup.key" :key="i" v-for="(optgroup, i) in getOptions()">
                        <option :value="option.value" :key="j" v-for="(option, j) in optgroup.values">
                            {{option.text}}
                        </option>
                    </optgroup>
                </select>
            </div>
        </td>
        <td>
            <div class="form-group" v-if="parents().length">
                <select class="form-control" v-model="field.parent" title="Parent">
                    <option :key="idx" v-for="(parent, idx) in parents()" :value="parent">
                        {{ parent }}
                    </option>
                </select>
            </div>
        </td>
        <td>
            <DataTypeOptions v-bind:field="field"
                             v-bind:index="index">
            </DataTypeOptions>
        </td>
        <td>
            <v-select :class="field.negative ? 'active' : ''" multiple v-model="field.negative" :options="(dataTypes[field.type] && dataTypes[field.type].negative) || []"></v-select>
        </td>
        <td class="delete_option">
            <button type="button" class="btn btn-primary" v-on:click="remove(index)">
                <icon name="trash"></icon>
                <!-- DELETE -->
            </button>
        </td>
    </tr>
</template>

<script>
    import _ from 'lodash'
    import Icon from 'vue-awesome/components/Icon'
    import dataTypes from '../../vendor/data-types';
    import DataTypeOptions from './options';
    
    export default {
        name: 'DataType',
        props: ['index', 'field', 'fields'],
        data: function () {
            return {
                dataTypes
            }
        },
        components: {
            Icon,
            DataTypeOptions
        },
        mounted: function() {
        },
        methods: {
            remove: function (index) {
                this.$emit('remove', index);
            },
            parents: function() {
                
                return _.map(
                    _.filter(
                        this.fields,
                        field => field.name && field.name !== this.field.name && field.type === 'object'
                    ),
                    'name'
                );

            },
            getOptions: function() {
                let toArray = Object.keys(dataTypes).map(key => {
                    let oneRecord = {...dataTypes[key]}
                    oneRecord.value = key
                    oneRecord.text = this.stringFilter(key)
                    return oneRecord
                })
                let arrayGroup = _.mapValues(_.groupBy(toArray, 'group'),
                          clist => clist.map(p => _.omit(p, 'group')))

                let result = Object.keys(arrayGroup).map(key => {
                    /* let subOptions = arrayGroup[key].map(subOpion => {
                        return (<option value="subOpion.value">${subOpion.text}</option>)
                    })
                    return (<optgroup label="key">{subOptions}</optgroup>) */
                    // console.log(33,{key: key, values: arrayGroup[key]})
                    return {key: key, values: arrayGroup[key]}
                })
                return result
            },
            stringFilter: function(str) {
                let label = ""
                for(let i=0; i<str.length; i++) {
                    if(str.charAt(i) === str.charAt(i).toUpperCase()) {
                        label = label + " " + str.charAt(i)
                    }else{
                        label = label + str.charAt(i)
                    }
                }
                label = label.charAt(0).toUpperCase() + label.slice(1)
                return label
            },
        },
        watch: {
            "field.type": function () { 
                Object.keys(this.field).forEach(key => {
                    if (key !== 'name' && key !== 'type') {
                        delete this.field[key];
                    }
                });
            }
        }
    }
</script>

<style>
.item .form-control, .item .form-control {
  min-height: 36px;
}
.item .dropdown, .item .dropdown-toggle {
  min-height: 36px;
}
.item .form-control {
  min-height: 26px;
}
.item .selected-tag {
  height: 26px;
}


.delete_option .btn-primary {
  font-size: 14px;
  background: #d9534f;
  border: none;
  box-shadow: none;
  outline: none;
}
.delete_option .btn-primary:hover {
  color:#fff;
  background-color:#ca423e;
  border-color:#d43f3a;
}
.delete_option .btn-primary:focus,
.delete_option .btn-primary.focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
.delete_option .btn-primary.disabled,
.delete_option .btn-primary:disabled {
  color:#fff;
  background-color: #d43f3a;
  border-color:#9b2c28;
}
.delete_option .btn-primary:not(:disabled):not(.disabled):active,
.delete_option .btn-primary:not(:disabled):not(.disabled).active,
.show>.btn-primary.dropdown-toggle {
  color:#fff;
  background-color:#a71611;
  border-color:#000;
}
.delete_option .btn-primary:not(:disabled):not(.disabled):active:focus,
.delete_option .btn-primary:not(:disabled):not(.disabled).active:focus,
.show>.btn-primary.dropdown-toggle:focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
</style>