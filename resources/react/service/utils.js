import routes from '@r/routes'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const parseEmailOrPhone = (emailOrPhone) => {
  let result = {
    email: null,
    phone: null,
  }
  let parsed = String(emailOrPhone)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  if (parsed === null) {
    result.phone = emailOrPhone
  } else {
    result.email = emailOrPhone
  }
  return result
}

const getRoute = (pathname) => {
  const currentRoute = routes.find((route) => {
    return route.props.path === pathname
  })
  return currentRoute ? currentRoute.props : false
}

const getLanguage = () => {
  return cookies.get('lang') || 'en'
}

const setLanguage = (language) => {
  cookies.set('lang', language, { sameSite: 'lax' })
  return language
}

const stripTrailingChar = (str, char) => {
  return str.endsWith(char) ? str.slice(0, -1) : str
}

const parseURL = (url) => {
  url = stripTrailingChar(url, '/').split('/')
  return url[url.length - 1]
}

const capitalize = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const getAvatar = () => {
  return localStorage.getItem('photo') || '/public/images/default.png'
}

export { parseEmailOrPhone, cookies, getRoute, getLanguage, setLanguage, stripTrailingChar, parseURL, capitalize, getAvatar }
