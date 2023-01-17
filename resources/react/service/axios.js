import axios from 'axios'
import { ACCESS_TOKEN, APP_URL } from './config'
import { cookies } from './utils'

const getToken = () => {
  return cookies.get(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN)
}

axios.defaults.baseURL = APP_URL
axios.defaults.withCredentials = true

export default axios
