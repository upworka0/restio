import Api from './api'

export default {
  getUsers() {
    return Api().post('/get_users')
  },
  saveUser(params) {
    return Api().post('/save_user', params)
  },
  insertUser(params) {
    return Api().post('/insert_user', params)
  },
  removeUser(params) {
    return Api().post('/remove_user', params)
  },
  removeUsers(params) {
    return Api().post('/remove_users', params)
  },
  authPermission() {
    return Api().post('/auth_permission')
  },
  saveAdmin(params) {
    return Api().post('/save_admin', params)
  },
}