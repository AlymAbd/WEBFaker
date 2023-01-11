import axios from 'axios'
import { ACCESS_TOKEN, CSRF_HEADER_NAME, CSRF_COOKIE_NAME, APP_URL } from './config'
import { cookies } from './utils'

const getToken = () => {
  return cookies.get(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN)
}

axios.defaults.baseURL = APP_URL

const base = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
})

base.defaults.headers.common = {
  Authorization: `Bearer ${getToken()}`,
  Accept: 'application/json',
  ContentType: 'application/json',
}

const session = base

session.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

session.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export { base, session }
