<template>
    <div class="form" v-if="dataTypes[field.type]">

        <div class="form-group" v-if="optionExists('min')">
            <input title="Min"
                    type="number"
                    class="form-control"
                    v-model.number="field.min"
                    placeholder="Min">
        </div>

        <div class="form-group" v-if="optionExists('max')">
            <input title="Max"
                   type="number"
                   class="form-control"
                   v-model.number="field.max"
                   placeholder="Max">
        </div>

        <div class="form-group" v-if="optionExists('start')">
            <input title="Start"
                   type="number"
                   class="form-control"
                   v-model.number="field.start"
                   placeholder="Start">
        </div>

        <div class="form-group" v-if="optionExists('step')">
            <input title="Step"
                   type="number"
                   class="form-control"
                   v-model.number="field.step"
                   placeholder="Step">
        </div>

        <div class="form-group" v-if="optionExists('float')">
            <input title="Float"
                   type="number"
                   class="form-control"
                   v-model.number="field.float"
                   placeholder="Float">
        </div>

        <div class="form-group" v-if="optionExists('from')">
            <date-picker v-model="field.from"
                         :config="datePickerOptions(dataTypes[field.type].type)"
                         placeholder="From"
                         title="From">
            </date-picker>
        </div>

        <div class="form-group" v-if="optionExists('to')">
            <date-picker v-model="field.to"
                         :config="datePickerOptions(dataTypes[field.type].type)"
                         placeholder="To"
                         title="To">
            </date-picker>
        </div>

        <div class="form-group" v-if="optionExists('mins')">
            <input title="Minutes"
                   type="number"
                   class="form-control"
                   v-model.number="field.mins"
                   placeholder="Minutes">
        </div>

        <div class="form-group" v-if="optionExists('days')">
            <input title="Days"
                   type="number"
                   class="form-control"
                   v-model.number="field.days"
                   placeholder="Days">
        </div>

        <div class="form-group" v-if="optionExists('dateFormat')">
            <v-select :class="field.dateFormat ? 'active' : ''"
                      title="Date Format"
                      :options="dateFormats"
                      :value="dateFormats[0]"
                      placeholder="Date Format"
                      v-model="field.dateFormat">
            </v-select>
        </div>

        <div class="form-group" v-if="optionExists('timeFormat')">
            <v-select :class="field.timeFormat ? 'active' : ''"
                      title="Time Format"
                      :options="timeFormats"
                      :value="timeFormats[0]"
                      placeholder="Time Format"
                      v-model="field.timeFormat">
            </v-select>
        </div>

        <div class="form-group" v-if="optionExists('phoneFormat')">
            <v-select :class="field.phoneFormat ? 'active' : ''"
                      title="Phone Format"
                      :options="phoneFormats"
                      :value="phoneFormats[0]"
                      placeholder="Format"
                      v-model="field.phoneFormat">
            </v-select>
        </div>

        <div class="form-group" v-if="optionExists('value')">
            <textarea title="Value" class="form-control" v-model="field.value" placeholder="Value"></textarea>
        </div>
    </div>
</template>

<script>
    import Icon from 'vue-awesome/components/Icon'
    import dataTypes from '../../vendor/data-types';
    import datePicker from 'vue-bootstrap-datetimepicker';
    import jQuery from "jquery"

    export default {
        name: 'DataTypeOptions',
        props: ['index', 'field'],
        data: function () {
            return {
                dataTypes,
                phoneFormats: [
                    "###-###-####",
                    "(###) ###-####",
                    "### ### ####",
                    "+# ### ### ####",
                    "+# (###) ###-####",
                    "+#-###-###-####",
                    "#-(###)###-####",
                    "##########"
                ],
                dateFormats: [
                    "m/d/Y",
                    "m-d-Y",
                    "m.d.Y",
                    "m:d:Y",
                    "Y/m/d",
                    "Y-m-d",
                    "Y.m.d",
                    "Y:m:d",
                    "d/m/Y",
                    "d-m-Y",
                    "d.m.Y",
                    "d:m:Y"
                ],
                timeFormats: [
                    "HH:mm",
                    "hh:mm a",
                    "HH:mm:ss",
                    "HH:mm:ss:sss",
                    "HH:mm:ss.sssZ"
                ]
            }
        },
        components: {
            Icon,
            datePicker
        },
        methods: {
            remove: function (index) {
                this.$emit('remove', index);
            },
            optionExists(name) {
                return this.dataTypes[this.field.type].options.indexOf(name) !== -1;
            },
            datePickerOptions(type) {
                let format;
                switch (type) {
                    case 'date':
                        format = 'MM/DD/YYYY';
                        break;
                    case 'time':
                        format = 'HH:mm';
                        break;
                    default:
                        format = 'MM/DD/YYYY HH:mm';
                }
                return {
                    format
                };
            }
        }
    }

    jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
        icons: {
            time: 'far fa-clock',
            date: 'far fa-calendar',
            up: 'fas fa-arrow-up',
            down: 'fas fa-arrow-down',
            previous: 'fas fa-chevron-left',
            next: 'fas fa-chevron-right',
            today: 'fas fa-calendar-check',
            clear: 'far fa-trash-alt',
            close: 'far fa-times-circle'
        }
    });
</script>