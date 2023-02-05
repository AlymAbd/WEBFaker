import User from '@r/models/Users'
import ObjectDetail from '@r/components/ObjectDetail'
import { CCol, CRow } from '@coreui/react'
import withRouter from '@r/components/WithRouter'
import AbsFormDetail from '../../../components/abstract/Form'

class UserComponent extends AbsFormDetail {
  constructor(props) {
    super(props)
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
