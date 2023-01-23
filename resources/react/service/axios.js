import axios from 'axios'
import { ACCESS_TOKEN, CSRF_HEADER_NAME, CSRF_COOKIE_NAME, APP_URL } from './config'
import { cookies } from './utils'

axios.defaults.baseURL = APP_URL
axios.defaults.withCredentials = true

const base = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
})

base.defaults.headers.common = {
  Accept: 'application/json',
  ContentType: 'application/json',
}

export { axios, base }
