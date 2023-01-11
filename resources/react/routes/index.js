import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Auth from '@r/service/auth'

const auth = Auth.getCurrentUserData()

// System pages
const Page500 = React.lazy(() => import('@r/pages/Page500'))

// Pages
const DefaultLayout = React.lazy(() => import('@r/pages/cabinet/layout/DefaultLayout'))
const Main = React.lazy(() => import('@r/pages/main/MainPage'))
const Login = React.lazy(() => import('@r/pages/main/Login'))
const Register = React.lazy(() => import('@r/pages/main/Register'))
const ForgotPassword = React.lazy(() => import('@r/pages/main/ForgotPassword'))

const routes = [
  <Route exact path="/" name="Home" element={<Main />} key="rHome" display="home" />,

  <Route exact path="/cabinet/*" name="Cabinet" element={<DefaultLayout />} key="rCabinet" display="home" authType="only" />,
  <Route exact path="/login" name="Login Page" element={<Login />} key="rLogin" display="home" authType="without" />,
  <Route exact path="/register" name="Register Page" element={<Register />} key="rRegister" display="home" authType="without" />,
  <Route exact path="/reset_password" name="Reset Password" element={<ForgotPassword />} key="rRestPass" authType="without" />,

  <Route exact path="/500" name="500" element={<Page500 />} key="r500" />,
  <Route path="*" element={<Navigate replace to="/" />} key="rredirect404" />,
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
