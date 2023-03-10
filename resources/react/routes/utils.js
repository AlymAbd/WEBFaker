import Routes from './index'

const getRoutes = (type) => {
  return Routes.filter((row) => {
    if (row.props.display) {
      return row.props.display == type
    } else {
      return false
    }
  })
}

const generateLink = (url) => {
  if (url && ![url.slice(1, 2), url.slice(0, 1)].includes('#')) {
    url = '/#/' + url
  }
  return url || '/#'
}

export { getRoutes, generateLink }
