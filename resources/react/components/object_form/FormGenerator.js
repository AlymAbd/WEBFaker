import InputFieldGenerator from './InputFieldGenerator'
import { CForm, CCol, CRow, CButtonGroup, CButton } from '@coreui/react'
import { Column } from '../../models/items'

const t = global.$t

class FormGenerator extends InputFieldGenerator {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
  }

  getFieldsToGenerate = () => {
    return this.model.getColumns()
  }

  // abstract method for generate bar in the top form
  genereateTopBar = () => {
    return <div></div>
  }

  // abstract method for generate bar in the bottom form
  genereateBottomBar = () => {
    return <div></div>
  }

  // button generation
  generateButtons = () => {
    return (
      <CButton color="success" variant="outline" type="submit" disabled={Object.keys(this.state.files.toUpload).length > 0}>
        {t('Save')}
      </CButton>
    )
  }

  handleInput = (e) => {
    this.state.model[e.target.name] = e.target.value
    this.setState({ model: this.state.model })
  }

  handleCheckbox = (e) => {
    this.state.model[e.target.name] = e.target.checked
    this.setState({ model: this.state.model })
  }

  handleDatePicker = (date, model) => {
    this.state.model[model] = date.getTime()
    this.setState({ model: this.state.model })
  }

  handleSelect = ({ label, value, ...other }, e) => {
    this.state.model[e.name] = value
    this.setState({ model: this.state.model })
  }

  handleForeign = ({ label, value, ...other }, e) => {
    this.state.model[e.name] = value
    this.setState({ model: this.state.model })
  }

  handleFile = (e) => {
    //
  }

  handleImage = (e) => {
    this.handleInput(e)
    const fileList = e.target.files
    Object.keys(fileList).forEach((ind) => {
      if (fileList[ind]) {
        let reader = new FileReader()
        reader.onload = function (ev) {
          this.state.preview[e.target.id] = ev.target.result
          this.setState({ preview: this.state.preview })
        }.bind(this)
        reader.readAsDataURL(fileList[ind])
        this.state.files.toUpload[e.target.id] = fileList
        this.setState({ files: this.state.files })
      }
    })
  }

  uploadFile = (event) => {
    event.preventDefault()
    if (Object.keys(this.state.files.toUpload).length > 0) {
      let formData = new FormData()
      Object.keys(this.state.files.toUpload).forEach((fileType) => {
        Object.keys(this.state.files.toUpload[fileType]).forEach((fileName) => {
          formData.append(fileType, this.state.files.toUpload[fileType][fileName])
        })
      })
      this.model
        .uploadFile(formData, this.id)
        .then((response) => {
          this.state.files.uploaded = this.state.files.toUpload
          this.state.files.toUpload = []
          this.setState({ files: this.state.files })
          this.onUploadCallback(response)
        })
        .catch((error) => {
          this.onUploadErrorCallback(error)
        })
    }
  }

  submitForm = (event) => {
    event.preventDefault()
    this.setState({ validation: this.model.getColumnValues(null, true) })
    if (this.id && Object.keys(this.state.files.toUpload).length === 0) {
      this.model
        .updateRecord(this.getValuesForRequest(), this.id)
        .then((response) => {
          let data = response.data
          this.model.applyValues(data)
          this.setState({ model: this.model.getColumnValues() })
          this.onSubmitCallback(response)
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            this.handleError(error)
          }
          this.onSubmitErrorCallback(error)
        })
    } else if (Object.keys(this.state.files.toUpload).length > 0) {
      alert('Upload your file before save')
    } else {
      this.model
        .createRecord(this.getValuesForRequest())
        .then((response) => {
          let data = response.data
          this.model.applyValues(data)
          this.setState({ model: this.model.getColumnValues() })
          this.onSubmitCallback(response)
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            this.handleError(error)
          }
          this.onSubmitErrorCallback(error)
        })
    }
  }

  handleError = (error) => {
    let errors = error.response.data
    Object.keys(this.state.validation).forEach((key) => {
      if (errors.hasOwnProperty(key)) {
        this.state.validation[key] = errors[key].join('\n')
      }
    })
    this.setState({ validation: this.state.validation })
  }

  onSubmitCallback = (response) => {
    //
  }

  onSubmitErrorCallback = (response) => {
    //
  }

  onUploadCallback = (response) => {
    //
  }

  onUploadErrorCallback = (response) => {
    //
  }

  setFormValues = (values) => {
    this.model.columns.forEach((col) => {
      if (col.format === Column.FORMAT_IMAGE) {
        this.state.preview[col.name] = values[col.name]
        this.setState({ preview: this.state.preview })
      }
    })
    this.setState({ model: values })
  }

  getValuesForRequest = () => {
    let formData = {}
    Object.keys(this.state.model).forEach((record) => {
      if (record.includes('__')) {
        let [parent, child] = record.split('__')
        if (!formData.hasOwnProperty(parent)) {
          formData[parent] = {}
        }
        formData[parent][child] = this.state.model[record]
      } else {
        formData[record] = this.state.model[record]
      }
    })
    return formData
  }

  render() {
    let form = []
    this.model.getColumns().forEach((col, i) => {
      form.push(this.generateField(col))
    })
    return (
      <div className="mb-4">
        {this.genereateTopBar()}
        <CForm key="form1" className="row g-3 needs-validation" onSubmit={this.submitForm}>
          <h5>{this.title}</h5>
          <p>
            <strong className="text-medium-emphasis">{this.description}</strong>
          </p>
          {form}
          <CRow>
            <CCol xs={4}>
              <CButtonGroup role="group" aria-label="Basic outlined example">
                {this.generateButtons()}
              </CButtonGroup>
            </CCol>
          </CRow>
        </CForm>
        {this.genereateBottomBar()}
      </div>
    )
  }
}

export default FormGenerator
