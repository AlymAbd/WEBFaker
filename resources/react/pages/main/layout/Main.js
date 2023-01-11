import React from 'react'
import { AppFooter, AppHeader } from './index'

const DefaultLayout = (props) => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">{props.children}</div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
