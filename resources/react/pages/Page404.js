import React from 'react'
import { CButton, CCol, CContainer, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import { generateLink } from '@r/routes/utils'
import AuthService from '@r/service/auth'

const t = global.$t
let isAuthorized = AuthService.getCurrentUserData()

const Page404 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">{t("Oops! You're lost.")}</h4>
              <p className="text-medium-emphasis float-start">{t('The page you are looking for was not found.')}</p>
            </div>
            <CInputGroup className="input-prepend">
              <CButton href={generateLink(isAuthorized ? 'cabinet' : '/#/')}>{t('Go to home')}</CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
