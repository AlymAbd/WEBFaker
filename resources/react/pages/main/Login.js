import React, { Component } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Main } from './layout'
import { cookies } from '@r/service/utils'
import { cibGoogle } from '@coreui/icons'

const t = global.$t

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message_type: 'primary',
      message_text: '',
      csfr: cookies.get('csrftoken')
    }
  }

  render() {
    const t = global.$t
    return (
      <Main>
        <div className="bg-light d-flex flex-row align-items-center">
          <CContainer>
            <CAlert color={this.state.message_type} visible={this.state.message_text !== ''}>
              {this.state.message_text}
            </CAlert>
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm action='/api/v1/auth/google/login/' method="post">
                        <input type="hidden" name="csrfmiddlewaretoken" value={this.state.csfr} />
                        <CButton color="info" type="submit"><CIcon icon={cibGoogle} />&nbsp;<span>{t('Login with google')}</span></CButton>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </Main>
    )
  }
}

export default Login
