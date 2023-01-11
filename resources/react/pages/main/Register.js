import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Main } from './layout'
import AuthService from '@r/service/auth'
import { t } from 'i18next'

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        name: '',
        password: '',
        password_confirmation: '',
        email: '',
      },
      validation: {
        name: '',
        password: '',
        password_confirmation: '',
        email: '',
      },
      message_text: '',
      message_type: 'danger',
    }

    this.handleForm = this.handleForm.bind(this)
  }

  handleInput = (e) => {
    let data = this.state.form
    data[e.target.id] = e.target.value
    this.setState({ form: data })
  }

  handleForm = (event) => {
    event.preventDefault()

    Object.keys(this.state.validation).forEach((row) => {
      this.state.validation[row] = ''
    })

    this.setState({ validation: this.state.validation })
    this.setState({
      message_text: '',
      message_type: 'alert',
    })

    const form = event.currentTarget
    if (form.checkValidity()) {
      AuthService.register(this.state.form)
        .then((response) => {
          this.setState({
            message_text: t('Done! Now you can login'),
            message_type: 'success',
          })
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            let errors = this.state.validation
            Object.keys(error.response.data).forEach((err) => {
              errors[err] = error.response.data[err].join('\n')
            })
            this.setState({ validation: errors })
            this.setState({ validated: true })
          } else {
            this.setState({ message_text: t('Server error') })
          }
        })
    } else {
      event.stopPropagation()
    }
  }

  render() {
    const t = global.$t
    return (
      <Main>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CAlert color={this.state.message_type} visible={this.state.message_text !== ''}>
                  {this.state.message_text}
                </CAlert>
                <CCardBody className="p-4">
                  <CForm onSubmit={this.handleForm} className="row g-3">
                    <h1>{t('Register')}</h1>
                    <p className="text-medium-emphasis">{t('Singup to us')}</p>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        id="name"
                        placeholder={t('Name')}
                        autoComplete="name"
                        onChange={this.handleInput}
                        required
                        invalid={this.state.validation['name'] !== ''}
                      />
                      <CFormFeedback style={{ whiteSpace: 'pre-line' }} invalid>
                        {this.state.validation['name']}
                      </CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        id="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={this.handleInput}
                        required
                        invalid={this.state.validation['email'] !== ''}
                      />
                      <CFormFeedback style={{ whiteSpace: 'pre-line' }} invalid>
                        {this.state.validation['email']}
                      </CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        id="password"
                        type="password"
                        placeholder={t('Password')}
                        autoComplete="new-password"
                        onChange={this.handleInput}
                        required
                        invalid={this.state.validation['password'] !== ''}
                      />
                      <CFormFeedback style={{ whiteSpace: 'pre-line' }} invalid>
                        {this.state.validation['password']}
                      </CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        id="password_confirmation"
                        type="password"
                        placeholder={t('Confirm password')}
                        autoComplete="new-password"
                        onChange={this.handleInput}
                        required
                        invalid={this.state.validation['password_confirmation'] !== ''}
                      />
                      <CFormFeedback style={{ whiteSpace: 'pre-line' }} invalid>
                        {this.state.validation['password_confirmation']}
                      </CFormFeedback>
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" type="submit">
                        {t('Create acoount')}
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </Main>
    )
  }
}

export default Register
