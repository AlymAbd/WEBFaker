import Component from '../abstract/Component'
import { Column } from '../../models/items'

import {
  CFormCheck,
  CButton,
  CCol,
  CRow,
  CFormInput,
  CFormTextarea,
  CFormSwitch,
  CFormLabel,
  CCard,
  CCardBody,
  CCardHeader,
  CFormFeedback,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import DatePicker from 'react-datepicker'
import Select, { components } from 'react-select'

const t = global.$t
const { Option } = components

class InputFieldGenerator extends Component {
  constructor(props) {
    super(props)
    this.model = new props.model()

    this.state = {
      model: this.model.getColumnValues(),
      validation: this.model.getColumnValues(null, true),
      foreign: {},
      preview: {},
      files: {
        uploaded: {},
        toUpload: {},
      },
    }

    this.title = this.getProp('modelTitle', this.model.title)
    this.description = this.getProp('modelDescription', this.model.description)
  }

  __iconOption = (props) => {
    let items = ''
    if (props.data.hasOwnProperty('icon')) {
      items = <CIcon icon={props.data.icon} />
    }

    return (
      <Option {...props}>
        {items}
        {'  '}
        {props.data.label}
      </Option>
    )
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeForeign = (column, attributes) => {
    delete attributes.value
    let currentValue = ''
    let selectOptions = []

    if (!this.state.foreign.hasOwnProperty(column.name)) {
      column.requestOptions(this.state.model[column.name]).then((response) => {
        this.state.foreign[column.name] = column.required ? [] : [{ label: <i>{t('empty')}</i>, value: '' }]
        response.data.data.forEach((row) => {
          this.state.foreign[column.name].push({
            label: row.title,
            value: row.name,
          })
        })
        this.setState({ foreign: this.state.foreign })
      })
    }

    if (this.state.foreign[column.name]) {
      currentValue = this.state.foreign[column.name].find((item) => item.value === this.state.model[column.name])
      selectOptions = this.state.foreign[column.name].filter((row) => {
        return row.value !== this.id
      })
    }
    return this.toFormInput(
      <Select name={column.name} value={currentValue} isSearchable options={selectOptions} onChange={this.handleForeign} {...attributes} />,
      column,
      attributes,
    )
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeSelect = (column, attributes) => {
    delete attributes.value
    return this.toFormInput(
      <Select
        name={column.name}
        options={column.options}
        value={column.options.find((item) => item.value === this.state.model[column.name])}
        onChange={this.handleSelect}
        components={{ Option: this.__iconOption }}
        {...attributes}
      />,
      column,
      attributes,
    )
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeDate = (column, attributes) => {
    attributes['className'] = 'form-control'
    attributes['selected'] = this.state.model[column.name]
    attributes['onChange'] = (date) => {
      this.handleDate(date, column.name)
    }
    return this.toFormInput(<DatePicker {...attributes} />, column, attributes)
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeCheckbox = (column, attributes) => {
    if (this.state.model[column.name]) {
      attributes['defaultChecked'] = true
    }
    attributes['onClick'] = this.handleCheckbox
    delete attributes['onChange']
    return this.toFormInput(<CFormSwitch {...attributes} />, column, attributes)
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeRadio = (column, attributes) => {
    let col = []
    column.options.forEach((row, i) => {
      let radioOptions = {}
      radioOptions['label'] = row.label
      radioOptions['value'] = row.value

      if (this.state.model[column.name] === row.value) {
        radioOptions['defaultChecked'] = true
      } else {
        radioOptions['defaultChecked'] = false
      }

      if (row.hasOwnProperty('disabled')) {
        radioOptions['disabled'] = true
      }

      col.push(
        <div key={i + 'opt'}>
          <CFormCheck {...attributes} {...radioOptions} />
        </div>,
      )
    })
    return this.toFormInput(col, column, attributes)
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeTextarea = (column, attributes) => {
    return this.toFormInput(<CFormTextarea rows={column.rows} {...attributes} />, column, attributes)
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeSimpleInput = (column, attributes) => {
    return this.toFormInput(<CFormInput {...attributes} />, column, attributes)
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeJson = (column, attributes) => {
    let jsonItems = []
    column.scheme.forEach((sch) => {
      jsonItems.push(this.generateField(sch))
    })
    return (
      <CCard key={'json_fields_' + column.name} className="mb-2">
        <CCardHeader>{column.title}</CCardHeader>
        <CCardBody>{jsonItems}</CCardBody>
      </CCard>
    )
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeFilePicker = (column, attributes) => {
    delete attributes.value
    attributes['accept'] = column.accepts
    return this.makeSimpleInput(column, attributes)
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeImagePicker = (column, attributes) => {
    let col = null
    attributes['type'] = 'file'
    attributes['id'] = column.name
    col = this.makeFilePicker(column, attributes)
    return (
      <CCard key={'input' + column.name} className="mb-2">
        <CCardHeader>{column.title}</CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol xs={10}>{col}</CCol>
            <CCol xs={2}>
              <CButton onClick={this.uploadFile} disabled={this.state.files.toUpload[column.name] === undefined}>
                {t('Upload')}
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={3}>
              <CImage rounded id={'image_' + column.name} src={this.state.preview[column.name]} alt={t('No preview')} fluid />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    )
  }

  /**
   *
   * @param {*} component
   * @param {Column} column
   * @param {*} attributes
   * @returns
   */
  toFormInput = (component, column, attributes) => {
    return (
      <div key={'input_' + column.name} className="mb-2">
        <CFormLabel htmlFor={column.name}>{column.title}</CFormLabel>
        {component}
        <CFormFeedback style={{ whiteSpace: 'pre-line' }} invalid>
          {this.state.validation[column.name]}
        </CFormFeedback>
      </div>
    )
  }

  /**
   *
   * @param {Column} column
   */
  generateField = (column) => {
    let attributes = {
      name: column.name,
      type: column.format,
      onChange: this.handleInput,
      invalid: this.state.validation[column.name] !== '',
      value: this.state.model[column.name],
    }
    let result = null

    if (column.required) {
      attributes['required'] = true
    }
    if (column.disabled) {
      attributes['disabled'] = true
    }

    switch (column.format) {
      case Column.FORMAT_CHECKBOX:
        attributes['onChange'] = this.handleCheckbox
        result = this.makeCheckbox(column, attributes)
        break
      case Column.FORMAT_DATE:
        attributes['onChange'] = this.handleDatePicker
        result = this.makeDate(column, attributes)
        break
      case Column.FORMAT_DATETIME:
        attributes['onChange'] = this.handleDatePicker
        attributes['showTimeSelect'] = true
        attributes['dateFormat'] = 'Pp'
        result = this.makeDate(column, attributes)
        break
      case Column.FORMAT_EMAIL:
        attributes['type'] = 'email'
        result = this.makeSimpleInput(column, attributes)
        break
      case Column.FORMAT_NUMBER:
        attributes['type'] = 'number'
        result = this.makeSimpleInput(column, attributes)
        break
      case Column.FORMAT_PASSWORD:
        attributes['type'] = 'password'
        result = this.makeSimpleInput(column, attributes)
        break
      case Column.FORMAT_ENUM:
        attributes['onChange'] = this.handleSelect
        attributes['isMulti'] = true
        result = this.makeSelect(column, attributes)
        break
      case Column.FORMAT_MULTISELECT:
        attributes['onChange'] = this.handleSelect
        attributes['isMulti'] = true
        result = this.makeSelect(column, attributes)
        break
      case Column.FORMAT_SELECT:
        attributes['onChange'] = this.handleSelect
        result = this.makeSelect(column, attributes)
        break
      case Column.FORMAT_FOREIGN:
        attributes['onChange'] = this.handleForeign
        result = this.makeForeign(column, attributes)
        break
      case Column.FORMAT_FILE:
        attributes['onChange'] = this.handleFile
        result = this.makeFilePicker(column, attributes)
        break
      case Column.FORMAT_IMAGE:
        attributes['onChange'] = this.handleImage
        result = this.makeImagePicker(column, attributes)
        break
      case Column.FORMAT_JSON:
        result = this.makeJson(column, attributes)
        break
      case Column.FORMAT_RADIO:
        result = this.makeRadio(column, attributes)
        break
      case Column.FORMAT_TEXTAREA:
        result = this.makeTextarea(column, attributes)
        break
      case Column.FORMAT_ID:
      case Column.FORMAT_TEXT:
      default:
        attributes['type'] = 'text'
        result = this.makeSimpleInput(column, attributes)
        break
    }
    return result
  }
}

export default InputFieldGenerator
