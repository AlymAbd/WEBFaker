import React from 'react'

const UserSettings = React.lazy(() => import('@r/pages/cabinet/user/UserSettings'))
const UserTable = React.lazy(() => import('@r/pages/cabinet/user/User'))
const UserDetail = React.lazy(() => import('@r/pages/cabinet/user/UserDetail'))

const Axios = React.lazy(() => import('@r/pages/cabinet/axios/Axios'))

const routes = [
  { path: '/user_settings/:id', name: 'User settings', element: UserSettings },
  { path: '/users', exact: true, name: 'Users', element: UserTable },
  { path: '/users/create', exact: true, name: 'User create', element: UserDetail },
  { path: '/users/:id', name: 'User detail', element: UserDetail },

  { path: '/axios', name: 'Custom Request', element: Axios },
]

export default routes
