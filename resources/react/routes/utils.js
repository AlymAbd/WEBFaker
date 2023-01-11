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

export { getRoutes }
