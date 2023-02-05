import Instances from '../../../models/Instances'
import ObjectDetail from '@r/components/ObjectDetail'
import { Component } from 'react'
import { CCol, CRow } from '@coreui/react'
import withRouter from '@r/components/WithRouter'

class InstanceDetailComponent extends Component {
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
            model={Instances}
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

export default withRouter(InstanceDetailComponent)
