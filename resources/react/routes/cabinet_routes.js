import React from 'react'

const UserTable = React.lazy(() => import('@r/pages/cabinet/user/User'))
const UserDetail = React.lazy(() => import('@r/pages/cabinet/user/UserDetail'))

const Axios = React.lazy(() => import('@r/pages/cabinet/axios/Axios'))

const InstanceTable = React.lazy(() => import('@r/pages/cabinet/ApiTest/Instances'))
const InstanceDetail = React.lazy(() => import('@r/pages/cabinet/ApiTest/InstanceDetail'))

const routes = [
  { path: '/users', exact: true, name: 'Users', element: UserTable },
  { path: '/users/create', exact: true, name: 'User create', element: UserDetail },
  { path: '/users/:id', name: 'User detail', element: UserDetail },

  { path: '/axios', name: 'Custom Request', element: Axios },

  { path: '/instances', name: 'Instances', element: InstanceTable },
  { path: '/instances/create', exact: true, name: 'Instances', element: InstanceDetail },
  { path: '/instances/:id', name: 'Instances', element: InstanceDetail },
]

export default routes
