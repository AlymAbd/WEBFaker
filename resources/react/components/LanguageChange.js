import Modal from './Modal'
import { CModalBody, CListGroup, CListGroupItem } from '@coreui/react'
import { Component } from 'react'
import { cifCz, cifGb, cifRu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { getLanguage, setLanguage } from '@r/service/utils'

let lang = [
  { item: 'en', title: 'English', icon: cifGb },
  { item: 'cz', title: 'Čeština', icon: cifCz },
  { item: 'ru', title: 'Русский', icon: cifRu },
]

class LanguageChange extends Component {
  constructor(props) {
    super(props)
  }

  getGroupLang(currentLang) {
    let listGroupLang = []
    lang.forEach((row, i) => {
      listGroupLang.push(
        <CListGroupItem key={i + 'listgroup'} component="button" active={currentLang === row.item} onClick={() => this.applyLanguage(row.item)}>
          <CIcon icon={row.icon} className="me-2" />
          {row.title}
        </CListGroupItem>,
      )
    })
    return listGroupLang
  }

  applyLanguage(language) {
    setLanguage(language)
    window.location.reload()
  }

  render() {
    const t = global.$t
    return (
      <>
        <Modal closeCallback={this.props.closeCallback} visible={this.props.visible} title={t('Change language')}>
          <CModalBody>
            <CListGroup>{this.getGroupLang(getLanguage())}</CListGroup>
          </CModalBody>
        </Modal>
      </>
    )
  }
}
export default LanguageChange
