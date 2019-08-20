<template>
  <div class="role_panel col-12">
    <div class="row users_setting">
      <div class="col-12">
        <div class="inner_panel">
          <div class="w-75 mx-auto">
            <div class="list_control_panel d-flex justify-content-end">
              <div class="btn-group btn-group-sm options_btn">
                <button type="button" class="btn btn-primary" @click="addUser">Add</button>
                <button type="button" class="btn btn-light" @click="removeUsers">Remove</button>
              </div>
            </div>
            <div class="users_list_panel my-1">
              <div class="list_header" id="list_header" ref="list_header">
                <div class="row">
                  <div class="col-lg-2 list_header_col"><label>Name</label></div>
                  <div class="col-lg-2 list_header_col"><label>Password</label></div>
                  <div class="col-lg-1 list_header_col"><label>Custom Rows</label></div>
                  <div class="col-lg-1 list_header_col"><label>All Combin...</label></div>
                  <div class="col-lg-1 list_header_col"><label>All Pairs</label></div>
                  <div class="col-lg-2 list_header_col"><label>Deadline</label></div>
                  <div class="col-lg-1 list_header_col"><label>Save</label></div>
                  <div class="col-lg-1 list_header_col">
                    <label>Select</label>
                    <!-- <input class="form-control check_custom" type="checkbox" /> -->
                </div>
                  <div class="col-lg-1 list_header_col border_none"><label>Remove</label></div>
                </div>
              </div>
              <div class="list_items" id="list_items" ref="list_items">
                <div class="row list_item" :key="'u-'+key" v-for="(user, key) in users">
                  <input type="hidden" :value="user.id">
                  <div class="col-lg-2 list_item_col">
                    <input class="form-control" type="text" placeholder="Name" :value="user.user_name" v-on:keyup.stop="updateUserName($event.target.value, key)">
                  </div>
                  <div class="col-lg-2 list_item_col">
                    <input class="form-control" type="text" placeholder="Password" :value="user.user_password" v-on:keyup.stop="updateUserPassword($event.target.value, key)">
                  </div>
                  <div class="col-lg-1 list_item_col d-flex justify-content-center align-items-center">
                    <b-form-checkbox :checked="user.custom_rows?true:false"  v-on:change="updateUserCustomRows($event, key)" switch></b-form-checkbox>                  
                  </div>
                  <div class="col-lg-1 list_item_col d-flex justify-content-center align-items-center">
                    <b-form-checkbox :checked="user.all_combinations?true:false" v-on:change="updateUserAllCombinations($event, key)" switch></b-form-checkbox>                  
                  </div>
                  <div class="col-lg-1 list_item_col d-flex justify-content-center align-items-center">
                    <b-form-checkbox :checked="user.all_pairs?true:false"  v-on:change="updateUserAllPairs($event, key)" switch></b-form-checkbox>                  
                  </div>
                  <div class="col-lg-2 list_item_col d-flex justify-content-center align-items-center">
                    <input class="form-control" type="text" placeholder="Due date" @click="dataPickerModal(key)" :value="user.timeline ? timestampToString(user.timeline) : ''" :ref="'datePickerInput-'+key">
                  </div>

                  <div class="col-lg-1 list_item_col tbl_opt_btn d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-primary btn-sm" @click="saveUser(user.id)">
                      <icon name="save"></icon>
                      <!-- SAVE -->
                    </button>
                  </div>
                  <div class="col-lg-1 list_item_col d-flex justify-content-center align-items-center">
                    <b-form-checkbox :checked="false"  v-on:change="updateSelecteds($event, user.id)" switch></b-form-checkbox>                  
                  </div>
                  <div class="col-lg-1 list_item_col border_none tbl_opt_btn px-0 d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-gray btn-sm" @click="removeUser(user.id)">
                      <icon name="trash"></icon>
                      <!-- DELETE -->
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="datePickerModal" ref="datePickerModal" v-if="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Modal Heading</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <date-picker 
              class="form-control data_picker"
              name="date"
              type="datetime"
              v-model="date"
              :config="options" 
              @dp-hide="doSomethingOnHide" 
              @dp-change="doSomethingOnChange"
            ></date-picker>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="dataPickerModalClose">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import services from '../services/services'

import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import datePicker from 'vue-bootstrap-datetimepicker';

export default {
  name: 'AdminRole',
  components: {
    Icon,
    datePicker
  },
  data: function() {
    return {
      adminName: '',
      adminPasswordCurrent: '',
      adminPasswordNew: '',
      adminPasswordConfirm: '',
      users: [],
      rowKeyForDateUpdate: -1,
      selecteds: [],
      authInfo: this.auth ? this.auth : '',
      date: new Date(),
      options: {
        format: 'MM/DD/YYYY',
        useCurrent: false,
        showClear: true,
        showClose: true
      }
    }
  },
  props: ['auth'],
  mounted: function () {
    // console.log(this.auth)
    services.getUsers().then((result) => {
      this.users = result.data
    })
    this.adminName = this.authInfo ? this.authInfo.name : ''
    this.adminPasswordCurrent = this.authInfo ? this.authInfo.password : ''
    // let listPanelWidth = this.$refs["list_items"].offsetWidth
    // this.$refs["list_header"].style.width = listPanelWidth + "px"
  },
  methods: {
    dataPickerModal(user_id) {
      this.rowKeyForDateUpdate = user_id
      this.$refs.datePickerModal.style.display = 'block'
    },
    dataPickerModalClose() {
      this.$refs.datePickerModal.style.display = 'none'
    },
    doSomethingOnChange() {
      this.users[this.rowKeyForDateUpdate].timeline = +new Date(this.date)
    },
    doSomethingOnHide() {
      this.users[this.rowKeyForDateUpdate].timeline = +new Date(this.date)
      this.$refs.datePickerModal.style.display = 'none'
    },
    timestampToString(tsp) {
      let d = new Date(tsp);
      let str = (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear()
      return str
    },
    onSubmitAdmin() {
      if(!this.adminPasswordCurrent) {
        alert('Please enter your old password.')
        return
      }
      if(this.adminPasswordNew !== this.adminPasswordConfirm) {
        alert('Please enter correctly new and confirm password.')
        return
      }

      let admin = {id: this.adminName, password: this.adminPasswordNew}
      services.saveAdmin({data: admin}).then(() => {
        alert('Save successful!\nPlease login again.')
        // this.adminPasswordCurrent = this.adminPasswordNew
        this.adminPasswordNew = ''
        this.adminPasswordConfirm = ''
      })

    },
    addUser() {
      let token_id = 'usr_' + this.randomString(16)
      let user = {
        id: token_id,
        user_name: '',
        user_password: '',
        custom_rows: 0,
        all_combinations: 0,
        all_pairs: 0
      }
      services.insertUser({data: user}).then(() => {
      })
      this.users.push(user)
    },
    saveUser(id) {
      let user = this.users.find(o => o.id === id)
      if(!user.user_name) {
        alert("Please enter an user's name.")
        return
      }
      if(!user.user_password) {
        alert("Please enter an user's password.")
        return
      }
      
      services.saveUser({data: user}).then(() => {
      })
    },
    removeUser(id) {
      let user = this.users.find(o => o.id === id)
      if(confirm("User name: " + user.user_name + "\nNotice! Will you delete this user really?")) {
        services.removeUser({data: {id}}).then(() => {
          services.getUsers().then((result) => {
            this.users = result.data
          })
        })
      }else{
        return
      }
    },
    removeUsers() {
      if(confirm("Notice! Will you delete these users really?")) {
        services.removeUsers({data: this.selecteds}).then(() => {
          this.selecteds = []
          services.getUsers().then((result) => {
            this.users = result.data
          })
        })
      }else{
        return
      }
    },
    updateAdminName(value) {
      this.adminName = value
    },
    updateAdminCurrentPassword(value) {
      this.adminPasswordCurrent = value
    },
    updateAdminNewPassword(value) {
      this.adminPasswordNew = value
    },
    updateAdminConfirmPassword(value) {
      this.adminPasswordConfirm = value
    },
    updateUserName(value, idx) {
      this.users[idx].user_name = value
    },
    updateUserPassword(value, idx) {
      this.users[idx].user_password = value
    },
    updateUserCustomRows(value, idx) {
      this.users[idx].custom_rows = +value
    },
    updateUserAllCombinations(value, idx) {
      this.users[idx].all_combinations = +value
    },
    updateUserAllPairs(value, idx) {
      this.users[idx].all_pairs = +value
    },
    updateSelecteds(value, id) {
      if(value) {
        this.selecteds.push(id)
      }else{
        let _selecteds = this.selecteds.filter((_id) => {
          return _id !== id
        })
        this.selecteds = _selecteds
      }
    },
    randomString(length) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = length;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }
  }
}
</script>

<style scoped>
.role_panel {
  position: relative;
  margin-top: 100px;
}
.inner_panel {
  padding: 40px 0 24px 0;
}
.inner_panel {
  /* border: 1px solid #dedede; */
}
.corner_label {
  padding: 10px 20px;
  text-align: left;
  position: absolute;
  top: 0;
  width: 140px;
  font-size: 18px;
  font-weight: 500;
}
.corner_label p {
  margin: 0;
}
.list_control_panel {
  padding: 10px;
  border-bottom: 1px solid #dedede;
}
.list_control_panel button {
  width: 100px;
}
.list_header {
  background-color: white;
  border-bottom: 1px solid #efefef;
  z-index: 1;
}
.list_header_col {
  margin-top: 4px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  border-right: 1px solid #efefef;
  font-size: 13px;
  font-weight: 600;
  color: #666;
}
.list_header {
  margin-right: 15px;
}
.list_header label {
  margin: 4px 0 ;
}
.users_list_panel {
  max-height: 350px;
}
.list_items {
  border-bottom: 1px solid #ededed;
  max-height: 320px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.list_item_col {
  margin: 8px 0;
}
.list_item_col input {
  font-size: 13px;
}
.check_custom {
  width: 16px;
  height: 16px;
}
.border_none {
  border: none;
}
.w-95 {
  width: 95%;
}

.data_picker {
  z-index: 2 !important;
}
#datePickerModal .modal-header button {
  display: none;
}



.save_btn .btn-primary:focus,
.save_btn .btn-primary.focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
.save_btn .btn-primary:not(:disabled):not(.disabled):active:focus,
.save_btn .btn-primary:not(:disabled):not(.disabled).active:focus,
.show>.btn-primary.dropdown-toggle:focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}

.options_btn .btn-primary {
  font-size: 14px;
  background: #5cb85c;
  border: none;
  box-shadow: none;
  outline: none;
}
.options_btn .btn-primary:hover {
  color:#fff;
  background-color:#4ea14e;
  border-color:#3f883f;
}
.options_btn .btn-primary:focus,
.options_btn .btn-primary.focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
.options_btn .btn-primary.disabled,
.options_btn .btn-primary:disabled {
  color:#fff;
  background-color: #307230;
  border-color:#1d4b1d;
}
.options_btn .btn-primary:not(:disabled):not(.disabled):active,
.options_btn .btn-primary:not(:disabled):not(.disabled).active,
.show>.btn-primary.dropdown-toggle {
  color:#fff;
  background-color:#408a40;
  border-color:#000;
}
.options_btn .btn-primary:not(:disabled):not(.disabled):active:focus,
.options_btn .btn-primary:not(:disabled):not(.disabled).active:focus,
.show>.btn-primary.dropdown-toggle:focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}

.options_btn .btn-light {
  font-size: 14px;
  background: #d9534f;
  color: white;
  border: none;
  box-shadow: none;
  outline: none;
}
.options_btn .btn-light:hover {
  color:#fff;
  background-color:#ca423e;
  border-color:#d43f3a;
}
.options_btn .btn-light:focus,
.options_btn .btn-light.focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
.options_btn .btn-light.disabled,
.options_btn .btn-light:disabled {
  color:#fff;
  background-color: #d43f3a;
  border-color:#9b2c28;
}
.options_btn .btn-light:not(:disabled):not(.disabled):active,
.options_btn .btn-light:not(:disabled):not(.disabled).active,
.show>.btn-light.dropdown-toggle {
  color:#fff;
  background-color:#a71611;
  border-color:#000;
}
.options_btn .btn-light:not(:disabled):not(.disabled):active:focus,
.options_btn .btn-light:not(:disabled):not(.disabled).active:focus,
.show>.btn-light.dropdown-toggle:focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}

.tbl_opt_btn .btn-primary {
  font-size: 12px;
  /* background: #d9534f; */
  color: white;
  border: none;
  box-shadow: none;
  outline: none;
}
.tbl_opt_btn .btn-primary:hover {
  color:#fff;
  /* background-color:#ca423e;
  border-color:#d43f3a; */
}
.tbl_opt_btn .btn-primary:focus,
.tbl_opt_btn .btn-primary.focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
.tbl_opt_btn .btn-primary.disabled,
.tbl_opt_btn .btn-primary:disabled {
  color:#fff;
  /* background-color: #d43f3a;
  border-color:#9b2c28; */
}
.tbl_opt_btn .btn-primary:not(:disabled):not(.disabled):active,
.tbl_opt_btn .btn-primary:not(:disabled):not(.disabled).active,
.show>.btn-primary.dropdown-toggle {
  color:#fff;
  /* background-color:#a71611;
  border-color:#000; */
}
.tbl_opt_btn .btn-primary:not(:disabled):not(.disabled):active:focus,
.tbl_opt_btn .btn-primary:not(:disabled):not(.disabled).active:focus,
.show>.btn-primary.dropdown-toggle:focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
.btn-gray {
  border: 1px solid gray;
  color: gray;
}
</style>