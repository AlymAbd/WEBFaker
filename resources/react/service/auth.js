import axios from './axios'
import { ACCESS_TOKEN, USER_DATA, PATH_PHOTO, XSRF_TOKEN, NIGHT_MODE } from './config'
import { cookies } from './utils'

class AuthService {
  _getToken() {
    return cookies.get(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN)
  }

  getAccessToken() {
    const token = this._getToken()
    if (token) {
      return token
    } else {
      this.logout()
      return false
    }
  }

  getCurrentUserData(key = null) {
    if (this.getAccessToken()) {
      const data = JSON.parse(localStorage.getItem(USER_DATA))
      if (key) {
        return data[key] || null
      } else {
        return data
      }
    } else {
      return false
    }
  }

  setCurrentUser(data) {
    if (data.settings) {
      this.handleUserSettings({ path_to_photo: data.settings.path_to_photo, ...data.settings.settings })
    }
    localStorage.setItem(USER_DATA, JSON.stringify(data))
  }

  logout() {
    cookies.remove(ACCESS_TOKEN)
    cookies.remove(XSRF_TOKEN)
    localStorage.removeItem(NIGHT_MODE)
    localStorage.removeItem(PATH_PHOTO)
    localStorage.removeItem(USER_DATA)
    return true
  }

  handleUserSettings({ path_to_photo, lang }) {
    if (path_to_photo) {
      localStorage.setItem(PATH_PHOTO, path_to_photo)
    }
    if (lang) {
      cookies.set('lang', lang, { sameSite: 'lax' })
    }
  }
}

export default new AuthService()
