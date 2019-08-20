<template>
  <div class="container-fluid">
    <div class="row auth_form justify-content-center align-items-center">
      <div class="col-6 back-signin"></div>
      <div class="col-6 d-flex justify-content-center align-items-center h-100">
        <form @submit.prevent="onSubmit" class="col-6">
          <a href="/home" ><h3 class="signin_label">Take Rest</h3> </a>

          <p>Reset your password.</p>
          <div class="form-group" :invalid-feedback="invalidFeedback">
            <input class="form-control" v-model="password" type="password" placeholder="Password" required>
          </div>
          <div class="form-group" :invalid-feedback="invalidFeedback">
            <input class="form-control" v-model="confirm_password" type="password" placeholder="Confirm password" required>
          </div>

          <div class="col-12"><p>{{statue}}</p></div>
          <div class="form-group text-center d-flex">
            <div class="col-12">
              <input type="submit" class="btn btn-bora btn-block sign_btn" value="Send request" />
            </div>
            <!-- <div class="col-6">
              <input type="button" class="btn outline-bora btn-block" value="Sign up" />
            </div> -->
          </div>
        </form>
        <a href='/' id='policy'>Term of use. Privacy policy</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Reset',
  data () {
    return {
      password: '',
      confirm_password: '',
      invalidFeedback: '',
      url: '/reset',
      statue: ''
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()
      if(this.password !== this.confirm_password){
        alert('No match password')
        return
      } else {
        let payload = {
          data: {
            password: this.password
          }
        }

        await axios.post(
          this.$config.get('api.url') + this.url, payload, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }
        )
        .then((res) => {
          if(!res.data.error) {
            return res.data
          }else{
            alert(res.data.error)
            return
          }
        })
      }
    }
  }
}
</script>

<style>
.signin_label {
  padding: 0;
  line-height: 1.1;
  color: #43425d;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: .5rem;
  margin-bottom: 1.5rem;
}
.auth_form {
  height: 100vh;
  color: #999;
}
.auth_form .btn-primary {
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  background: #00c1c0;
  border: none;
  box-shadow: none;
  min-width: 140px;
  outline: none;
}
.auth_form a {
  color: #00c1c0;
  text-decoration: none;
}
.auth_form a:hover {
  text-decoration: underline;
}




.auth_form .btn-primary:hover {
  color:#fff;
  background-color:#00b3b3;
  border-color:#00c1c0;
}
.auth_form .btn-primary:focus,
.auth_form .btn-primary.focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}
.auth_form .btn-primary.disabled,
.auth_form .btn-primary:disabled {
  color:#fff;
  background-color:teal;
  border-color:#00b3b3;
}
.auth_form .btn-primary:not(:disabled):not(.disabled):active,
.auth_form .btn-primary:not(:disabled):not(.disabled).active,
.show>.btn-primary.dropdown-toggle {
  color:#fff;
  background-color:#00b3b3;
  border-color:#000;
}
.auth_form .btn-primary:not(:disabled):not(.disabled):active:focus,
.auth_form .btn-primary:not(:disabled):not(.disabled).active:focus,
.show>.btn-primary.dropdown-toggle:focus {
  box-shadow: inset 0 4px 4px rgba(0,0,0,.075);
}

.back-signin {
  height: 100vh;
  background-image: url('../../assets/sign-in-back.png');
  background-position: center center;
  background-size: 100% 100%;
}
#policy {
  position: absolute;
  bottom: 1rem;
  color: #999;
}
</style>
