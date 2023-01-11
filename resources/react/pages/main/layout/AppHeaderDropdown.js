import React, { Component } from 'react'
import { CAvatar, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilUser, cilUserPlus, cilAccountLogout, cilHouse, cilLanguage } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import LanguageChange from '@r/components/LanguageChange'
import { getAvatar } from '@r/service/utils'
import AuthService from '@r/service/auth'

const t = global.$t
let isAuthorized = AuthService.getCurrentUserData()

const generateLink = (url) => {
  if (url && ![url.slice(1, 2), url.slice(0, 1)].includes('#')) {
    url = '/#/' + url
  }
  return url || '/#'
}

const logout = () => {
  AuthService.logout()
  window.location.reload()
}

const DropDownItems = () => {
  if (isAuthorized) {
    return [
      <CDropdownItem href={generateLink('cabinet')} key="cabinet">
        <CIcon icon={cilHouse} className="me-2" />
        {t('Cabinet')}
      </CDropdownItem>,
      <CDropdownItem onClick={logout} key="logout">
        <CIcon icon={cilAccountLogout} className="me-2" />
        {t('Logout')}
      </CDropdownItem>,
    ]
  } else {
    return [
      <CDropdownItem href={generateLink('login')} key="login">
        <CIcon icon={cilUser} className="me-2" />
        {t('Login')}
      </CDropdownItem>,
      <CDropdownItem href={generateLink('register')} key="register">
        <CIcon icon={cilUserPlus} className="me-2" />
        {t('Register')}
      </CDropdownItem>,
    ]
  }
}

class AppHeaderDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  hideModal = () => {
    this.setState({ visible: false })
  }

  render() {
    return (
      <>
        <LanguageChange closeCallback={this.hideModal} visible={this.state.visible} />
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CAvatar src={getAvatar()} size="md" />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">{t('Account')}</CDropdownHeader>
            <CDropdownItem onClick={this.showModal}>
              <CIcon icon={cilLanguage} className="me-2" />
              {t('Language')}
            </CDropdownItem>
            <CDropdownDivider />
            {<DropDownItems />}
          </CDropdownMenu>
        </CDropdown>
      </>
    )
  }
}

export default AppHeaderDropdown
