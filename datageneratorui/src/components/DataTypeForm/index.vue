<template>
    <table class="table">
        <thead>
        <tr>
            <th style="width: 20%" scope="col">Field Name</th>
            <th style="width: 20%" scope="col">Data Type</th>
            <th style="width: 20%" scope="col">Parent</th>
            <th style="width: 19%" scope="col">Options</th>
            <th style="width: 19%" scope="col">Negative</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <DataType
            :key="index"
            v-for="(field, index) in fields"
            v-bind:index="index"
            v-bind:field="field"
            v-bind:fields="fields"
            v-on:remove="remove"
        ></DataType>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="5" class="add_option">
                <button type="button" class="btn btn-primary" style="float: left;" v-on:click="add">
                    <icon name="plus"></icon> Add Field
                </button>
            </td>
        </tr>
        <tr>
            <td colspan="5" class="format_option">
                <div class="form-inline">
                    <div class="form-row">
                        <div class="form-group mx-sm-3" v-if="rowsCountActive">
                            <label class="control-label"># Rows:</label>
                            <input type="number" class="form-control" v-model="rowsCount" style="margin: 10px;">
                        </div>
                        <div class="form-group">
                            <label class="control-label">Format:</label>
                            <select class="form-control" v-model="format" style="margin: 10px;" @mousedown="selectTrigger">
                                <option :key="index" v-for="(format, index) in formats" v-bind:value="format">
                                    {{ format }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="5" class="gen_option">
                <button type="button" class="btn btn-primary" style="float: left;" v-on:click="generate">Generate</button>
            </td>
        </tr>
        </tfoot>
    </table>
</template>

<script src="./component.js"></script>

<style>
.format_option .form-control {
  min-height: 36px;
}

.add_option .btn-primary {
  font-size: 14px;
  background: #5cb85c;
  border: none;
  box-shadow: none;
  outline: none;
}
.add_option .btn-primary:hover {
  color:#fff;
  background-color:#4ea14e;
  border-color:#3f883f;
}
.add_option .btn-primary:focus,
.add_option .btn-primary.focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
.add_option .btn-primary.disabled,
.add_option .btn-primary:disabled {
  color:#fff;
  background-color: #307230;
  border-color:#1d4b1d;
}
.add_option .btn-primary:not(:disabled):not(.disabled):active,
.add_option .btn-primary:not(:disabled):not(.disabled).active,
.show>.btn-primary.dropdown-toggle {
  color:#fff;
  background-color:#408a40;
  border-color:#000;
}
.add_option .btn-primary:not(:disabled):not(.disabled):active:focus,
.add_option .btn-primary:not(:disabled):not(.disabled).active:focus,
.show>.btn-primary.dropdown-toggle:focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}

.gen_option .btn-primary:focus,
.gen_option .btn-primary.focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
.gen_option .btn-primary:not(:disabled):not(.disabled):active:focus,
.gen_option .btn-primary:not(:disabled):not(.disabled).active:focus,
.show>.btn-primary.dropdown-toggle:focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
.table {
  margin: 30px;
}
</style>
