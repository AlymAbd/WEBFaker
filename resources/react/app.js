import React, { Component, Suspense } from 'react'
import { HashRouter, Routes } from 'react-router-dom'

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

    this.state = {
      currentUser: null,
      accessToken: null,
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUserData()

    if (user) {
      this.setState({
        currentUser: user,
      })
    }

    EventBus.on('logout', () => {
      this.logout()
    })
  }

  componentWillUnmount() {
    EventBus.remove('logout')
  }

  logout() {
    AuthService.logout()
    this.setState({
      currentUser: null,
      accessToken: null,
    })
  }

  render() {
    const { accessToken, currentUser } = this.state

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
