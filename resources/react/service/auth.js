import { base, session } from './axios'
import { ACCESS_TOKEN, USER_DATA, PATH_PHOTO, XSRF_TOKEN, SESSION, NIGHT_MODE } from './config'
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

  setAccessToken(token, remember = false) {
    if (remember) {
      cookies.set(ACCESS_TOKEN, token, {
        path: '/',
        expires: new Date(new Date().getTime() + 1000000000),
        sameSite: 'strict',
      })
    } else {
      sessionStorage.setItem(ACCESS_TOKEN, token)
    }
  }

  setCurrentUser(data) {
    if (data.settings) {
      this.handleUserSettings({ path_to_photo: data.settings.path_to_photo, ...data.settings.settings })
    }
    localStorage.setItem(USER_DATA, JSON.stringify(data))
  }

  updateUserInfo(key, value) {
    localStorage.setItem(key, value)
  }

  logout() {
    cookies.remove(ACCESS_TOKEN)
    cookies.remove(SESSION)
    cookies.remove(XSRF_TOKEN)
    localStorage.removeItem(NIGHT_MODE)
    localStorage.removeItem(PATH_PHOTO)
    localStorage.removeItem(USER_DATA)
    return true
  }

  login({ email, phone, password, remember }) {
    return new Promise((resolve, reject) => {
      base
        .post('/login/', {
          email: email,
          phone: phone,
          password: password,
        })
        .then((response) => {
          this.setAccessToken(response.data.token, remember)
          delete response.data.token
          delete response.data.id
          this.setCurrentUser(response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  register({ email, name, password, password_confirmation, phone }) {
    return base.post(`/register/`, {
      email: email,
      title: name,
      password: password,
      password_confirmation: password_confirmation,
      phone: phone,
    })
  }

  verifyEmail(token) {
    return session.post('user/pin-code/verify', {
      token: token,
    })
  }

  resendVerification(email, phone) {
    return session.post('user/pin-code/resend', {
      email: email,
      phone: phone,
    })
  }

  handleUserSettings({ path_to_photo, lang, dark_mode }) {
    if (path_to_photo) {
      localStorage.setItem(PATH_PHOTO, path_to_photo)
    }
    if (dark_mode) {
      localStorage.setItem(NIGHT_MODE, dark_mode)
    }
    if (lang) {
      cookies.set('lang', lang, { sameSite: 'lax' })
    }
  }
}

export default new AuthService()
