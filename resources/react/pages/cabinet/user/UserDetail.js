import User from '@r/models/Users'
import ObjectDetail from '@r/components/ObjectDetail'
import { Component } from 'react'
import { CCol, CRow } from '@coreui/react'
import withRouter from '@r/components/WithRouter'

class UserComponent extends Component {
  constructor(props) {
    super(props)
    let { id } = props.params
    this.state = {
      id: id,
    }
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
        <CCol xs={6}>
          <ObjectDetail
            id={this.state.id}
            model={User}
            onUpload={this.onUploadCallback}
            onFailUpload={this.onFailUploadCallback}
            onSubmit={this.onSubmitCallback}
            onFailSubmit={this.onFailSubmitCallback}
          />
        </CCol>
      </CRow>
    )
  }
}

export default withRouter(UserComponent)
