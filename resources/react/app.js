import React, { Component, Suspense } from 'react'
import { HashRouter, Routes } from 'react-router-dom'
import { USER_DATA } from '@r/service/config'

import './scss/style.scss'
import 'react-datepicker/dist/react-datepicker.css'

import routes from './routes'
import EventBus from './service/eventbus'
import AuthService from './service/auth'
import history from './service/history'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)

    if (AuthService.isAuthorized() && localStorage.getItem(USER_DATA) === null) {
      AuthService.requestUserData()
    }

    this.state = {
      currentUser: null,
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUserData()

    if (user) {
      this.setState({
        currentUser: user,
      })
    }
  }

  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes history={history}>{routes}</Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
