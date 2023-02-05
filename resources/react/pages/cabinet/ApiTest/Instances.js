import Instances from '../../../models/Instances'
import { Component } from 'react'
import { CRow } from '@coreui/react'
import TableGenerator from '../../../components/object_table/TableGenerator'

export default class InstanceComponent extends Component {
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
          model={Instances}
          onUpload={this.onUploadCallback}
          onFailUpload={this.onFailUploadCallback}
          onSubmit={this.onSubmitCallback}
          onFailSubmit={this.onFailSubmitCallback}
          routeToCreate="/cabinet/instances/create"
          routeToDetail="/cabinet/instances"
        />
      </CRow>
    )
  }
}
