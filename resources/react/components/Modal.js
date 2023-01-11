import React from 'react'
import { CModal, CModalHeader, CModalTitle } from '@coreui/react'

const Modal = ({ closeCallback, visible, title, children }) => {
  return (
    <>
      <CModal visible={visible} onClose={() => closeCallback(false)}>
        <CModalHeader>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        {children}
      </CModal>
    </>
  )
}

export default Modal
