const APP_NAME = process.env.MIX_APP_NAME
const APP_URL = process.env.MIX_APP_URL || '/api/v1/'

const ACCESS_TOKEN = 'sessionid'
const USER_DATA = 'user_data'
const CSRF_COOKIE_NAME = 'csrftoken'
const CSRF_HEADER_NAME = 'X-CSRFToken'

const XSRF_TOKEN = 'XSRF-TOKEN'

// user settings
const PATH_PHOTO = 'photo'
const NIGHT_MODE = 'night_mode'

const TYPE_FORM = 'form'
const TYPE_TABLE = 'table'

export { ACCESS_TOKEN, USER_DATA, CSRF_COOKIE_NAME, CSRF_HEADER_NAME, APP_NAME, APP_URL, PATH_PHOTO, NIGHT_MODE, XSRF_TOKEN, TYPE_FORM, TYPE_TABLE }
