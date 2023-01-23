import React, { Component } from 'react'
import { CAvatar, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilUser, cilAccountLogout, cilHouse, cilLanguage } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import LanguageChange from '@r/components/LanguageChange'
import { getAvatar } from '@r/service/utils'
import { generateLink } from '@r/routes/utils'
import AuthService from '@r/service/auth'

const t = global.$t
let isAuthorized = AuthService.getCurrentUserData()

const DropDownItems = () => {
  if (isAuthorized) {
    return [
      <CDropdownItem href={generateLink('cabinet')} key="cabinet">
        <CIcon icon={cilHouse} className="me-2" />
        {t('Cabinet')}
      </CDropdownItem>,
      <CDropdownItem
        onClick={() => {
          AuthService.logout()
        }}
        key="logout"
      >
        <CIcon icon={cilAccountLogout} className="me-2" />
        {t('Logout')}
      </CDropdownItem>,
    ]
  } else {
    return [
      <CDropdownItem href={generateLink('/#/')} key="login">
        <CIcon icon={cilUser} className="me-2" />
        {t('Login')}
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
