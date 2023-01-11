import User from '@r/models/Users'
import { Component } from 'react'
import { CRow } from '@coreui/react'
import TableGenerator from '../../../components/object_table/TableGenerator'

class UserSettingsComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  onSubmitCallback = (response) => {
    //
  }

  onFailSubmitCallback = (response) => {
    //
  }

  onUploadCallback = (response) => {
    //
  }

  onFailUploadCallback = (response) => {
    //
  }

  render() {
    return (
      <CRow>
        <TableGenerator
          id={this.state.id}
          model={User}
          onUpload={this.onUploadCallback}
          onFailUpload={this.onFailUploadCallback}
          onSubmit={this.onSubmitCallback}
          onFailSubmit={this.onFailSubmitCallback}
          routeToDetail="/#/cabinet/users/"
        />
      </CRow>
    )
  }
}

export default UserSettingsComponent
