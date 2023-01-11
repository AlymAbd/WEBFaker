const APP_NAME = process.env.MIX_APP_NAME
const APP_URL = process.env.MIX_APP_URL || '/api/v1/'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const USER_DATA = 'user_data'
const EXPIR_DATE = 'token_expire_at'
const CSRF_COOKIE_NAME = 'csrftoken'
const CSRF_HEADER_NAME = 'X-CSRFToken'

const XSRF_TOKEN = 'XSRF-TOKEN'
const SESSION = 'studovac_session'

// user settings
const PATH_PHOTO = 'photo'
const NIGHT_MODE = 'night_mode'

export {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_DATA,
  EXPIR_DATE,
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME,
  APP_NAME,
  APP_URL,
  PATH_PHOTO,
  NIGHT_MODE,
  SESSION,
  XSRF_TOKEN,
}
