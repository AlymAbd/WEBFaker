import { base } from './axios'
import { ACCESS_TOKEN, USER_DATA, PATH_PHOTO, XSRF_TOKEN, NIGHT_MODE } from './config'
import { cookies } from './utils'

class AuthService {
  isAuthorized = () => {
    const elem = document.getElementById('authorized')
    if (elem !== null) {
      return true
    } else {
      return false
    }
  }

  requestUserData = () => {
    base.get('/accounts/settings/').then((response) => {
      const data = response.data.results[0]['extra_data']
      this.setCurrentUser({
        email_verified: data['email_verified'],
        email: data['email'],
        locale: data['locale'],
        path_to_photo: data['picture'],
        name: data['name'],
      })
      window.location.reload()
    })
  }

  getCurrentUserData = (key = null) => {
    let value = false
    if (this.isAuthorized()) {
      const data = JSON.parse(localStorage.getItem(USER_DATA))
      if (key) {
        value = data[key] || null
      } else {
        value = data
      }
    }
    return value
  }

  setCurrentUser = ({ email_verified, email, locale, path_to_photo, name }) => {
    this.handleUserSettings({ path_to_photo: path_to_photo, locale })
    localStorage.setItem(
      USER_DATA,
      JSON.stringify({
        email_verified: email_verified,
        email: email,
        locale: locale,
        path_to_photo: path_to_photo,
        name: name,
      }),
    )
  }

  logout = (reload = false) => {
    cookies.remove(ACCESS_TOKEN)
    cookies.remove(XSRF_TOKEN)
    localStorage.removeItem(NIGHT_MODE)
    localStorage.removeItem(PATH_PHOTO)
    localStorage.removeItem(USER_DATA)
    base.post('/auth/logout/').then(() => {
      if (reload === true) {
        window.location.reload()
      } else if (reload) {
        window.location.replace(reload)
      }
    })
    return true
  }

  handleUserSettings = ({ path_to_photo, lang }) => {
    if (path_to_photo) {
      localStorage.setItem(PATH_PHOTO, path_to_photo)
    }
    if (lang) {
      cookies.set('lang', lang, { sameSite: 'lax' })
    }
  }
}

export default new AuthService()
