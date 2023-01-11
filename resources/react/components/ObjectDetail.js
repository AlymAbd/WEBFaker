import withRouter from '@r/components/WithRouter'
import FormGenerator from './object_form/FormGenerator'
import { CButton } from '@coreui/react'
import { Column } from '../models/items'

const t = global.$t

class ObjectDetail extends FormGenerator {
  constructor(props) {
    super(props)
    this.id = this.props.id

    if (props.hasOwnProperty('onUpload')) {
      this.onUploadCallback = props.onUpload
    }

    if (props.hasOwnProperty('onFailUpload')) {
      this.onUploadErrorCallback = props.onFailUpload
    }

    if (props.hasOwnProperty('onSubmit')) {
      this.onSubmitCallback = props.onSubmit
    }

    if (props.hasOwnProperty('onFailSubmit')) {
      this.onSubmitErrorCallback = props.onFailSubmit
    }

    this.buttons = (
      <CButton color="success" type="submit">
        {t('Save')}
      </CButton>
    )
    if (this.id) {
      this.buttons = (
        <CButton color="warning" type="submit">
          {t('Update')}
        </CButton>
      )
    }
  }

  // button generation
  generateButtons = () => {
    return this.buttons
  }

  componentDidMount = () => {
    let relations = []
    this.model.getColumns().map((col) => {
      if (col.format == Column.FORMAT_FOREIGN) {
        if (col.requestName) {
          relations.push(col.requestName)
        }
      }
    })
    if (this.id) {
      this.model
        .getDetailRecord(this.id, relations)
        .then((response) => {
          let data = response.data.data
          this.model.applyValues(data)
          this.setFormValues(this.model.getColumnValues())
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}

export default withRouter(ObjectDetail)
