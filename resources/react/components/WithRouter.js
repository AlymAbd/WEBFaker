import React from 'react'
import { useParams } from 'react-router-dom'

const withRouter =
  (WrappedComponent) =>
  ({ element, ...props }) => {
    const params = useParams()

    return <WrappedComponent component={<element />} {...props} params={params} />
  }

export default withRouter
