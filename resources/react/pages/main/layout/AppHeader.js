import React from 'react'
import { NavLink } from 'react-router-dom'
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CNavLink, CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AppHeaderDropdown from './AppHeaderDropdown'
import { getRoutes } from '@r/routes/utils'
import { stripTrailingChar } from '@r/service/utils'

const AppHeader = () => {
  let routes = getRoutes('home')
  let elements = []
  routes.forEach((row, i) => {
    elements.push(
      <CNavItem key={'navlink' + i + 1}>
        <CNavLink to={stripTrailingChar(row.props.path, '*')} component={NavLink}>
          {row.props.name}
        </CNavLink>
      </CNavItem>,
    )
  })

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon="/static/images/logo.png" height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">{elements}</CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
        <CHeaderNav className="ms-3"></CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
