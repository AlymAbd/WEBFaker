import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Auth from '@r/service/auth'

const auth = Auth.getCurrentUserData()

// System pages
const Page500 = React.lazy(() => import('@r/pages/Page500'))
const Page404 = React.lazy(() => import('@r/pages/Page404'))

// Pages
const DefaultLayout = React.lazy(() => import('@r/pages/cabinet/layout/DefaultLayout'))
const Login = React.lazy(() => import('@r/pages/main/Login'))

const routes = [
  <Route exact path="/" name="Home" element={<Login />} key="rHome" display="home" />,
  <Route exact path="/cabinet/*" name="Cabinet" element={<DefaultLayout />} key="rCabinet" display="home" authType="only" />,
  <Route exact path="/500" name="500" element={<Page500 />} key="r500" />,
  <Route path="*" element={<Page404 />} key="rredirect404" />,
]

export default routes.filter((row) => {
  if (row.props.authType) {
    switch (row.props.authType) {
      case 'only':
        return auth
      case 'without':
        return !auth
      default:
        return true
    }
  } else {
    return true
  }
})
