<template>
  <div class="role_panel col-12">
    <div class="row admin_setting">
      <div class="col-6">
        <div class="inner_panel">
          <div class="w-50 ml-auto">
            <form @submit.prevent="onSubmit">
              <div class="form-group mb-5">
                <input class="form-control" type="text" placeholder="Name" v-on:keyup.stop="updateUserName($event.target.value)" :value="name" required/>
              </div>
              <div class="form-group mb-5">
                <input class="form-control" type="password" placeholder="Current Password" v-on:keyup.stop="updateCurrentPassword($event.target.value)" required/>
              </div>
              <div class="form-group mb-5">
                <input class="form-control" type="password" placeholder="New Password" v-on:keyup.stop="updateNewPassword($event.target.value)" required/>
              </div>
              <div class="form-group mb-5">
                <input class="form-control" type="password" placeholder="Confirm Password" v-on:keyup.stop="updateConfirmPassword($event.target.value)" required/>
              </div>
              <div class="form-group mb-5 text-center save_btn">
                <input type="submit" class="btn btn-bora btn-block" value="Save"/>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-6">
        <img src="../../assets/persons.png">
      </div>
    </div>
  </div>
</template>

<script>
import services from '../services/services'

export default {
  name: 'UserRole',
  data: function() {
    return {
      id: '',
      name: '',
      current_password: '',
      new_password: '',
      confirm_password: '',
      authInfo: this.auth ? this.auth : ''
    }
  },
  props: ['auth'],
  mounted: function() {
    this.id = this.authInfo ? this.authInfo.id : ''
    this.name = this.authInfo ? this.authInfo.name : ''
    this.current_password = this.authInfo ? this.authInfo.password : ''
  },
  methods: {
    onSubmit() {
      if(!this.current_password) {
        alert('Please enter your old password.')
        return
      }
      if(this.new_password !== this.confirm_password) {
        alert('Please enter correctly new and confirm password.')
        return
      }

      let user = {id: this.id, user_name: this.name, user_password: this.new_password}
      services.saveUser({data: user}).then(() => {
        alert('Save successful!\nPlease login again.')
        // this.current_password = this.new_password
        this.new_password = ''
        this.confirm_password = ''
      })
    },
    updateUserName(value) {
      this.name = value
    },
    updateCurrentPassword(value) {
      this.current_password = value
    },
    updateNewPassword(value) {
      this.new_password = value
    },
    updateConfirmPassword(value) {
      this.confirm_password = value
    },
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

.save_btn .btn-primary:focus,
.save_btn .btn-primary.focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
.save_btn .btn-primary:not(:disabled):not(.disabled):active:focus,
.save_btn .btn-primary:not(:disabled):not(.disabled).active:focus,
.show>.btn-primary.dropdown-toggle:focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
</style>
