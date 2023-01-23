import React from 'react'
import { CAvatar, CBadge, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilBell, cilCreditCard, cilCommentSquare, cilEnvelopeOpen, cilFile, cilLockLocked, cilSettings, cilTask, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { getAvatar } from '@r/service/utils'
import AuthService from '@r/service/auth'

const t = global.$t

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={getAvatar()} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">{t('Settings')}</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          {t('Profile')}
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          {t('Settings')}
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem
          onClick={() => {
            AuthService.logout('/#/')
          }}
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          {t('Logout')}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
