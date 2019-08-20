import axios from 'axios'
import config from '../../config';

const API_ROOT = `${config.api.url}`
export default() => {
  return axios.create({
    baseURL: `${API_ROOT}`,
    method: 'post',
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token')
    }
  })
}
