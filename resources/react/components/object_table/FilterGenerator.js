import DatePicker from 'react-datepicker'
import { CFormCheck, CFormInput } from '@coreui/react'
import FieldGenerator from '../object_form/FieldGenerator'
import { Column } from '../../models/items'
import Select from 'react-select'

const t = global.$t

class FilterGenerator extends FieldGenerator {
  columnName = null

  /**
   *
   * @param {Column} column
   * @param {} props
   */
  constructor(props) {
    super(props)
    this.baseHandler = this.baseHandler.bind(this)
    this.state = {}
  }

  /**
   *
   * @param {*} value
   */
  baseHandler = (value) => {
    if (this.props.updateStateCallback !== null) {
      this.props.updateStateCallback({ column: this.columnName, value: value })
    }
  }

  toFormInput = (component, column, attributes) => {
    return component
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeCheckbox = (column, attributes) => {
    delete attributes['onBlur']
    attributes['onChange'] = () => {
      let value = ''
      switch (this.props.valuex) {
        case true:
          value = false
          break
        case false:
          value = ''
          break
        case '':
          value = true
          break
      }
      this.baseHandler(value)
    }
    return this.toFormInput(
      <CFormCheck {...attributes} indeterminate={this.props.valuex === ''} checked={this.props.valuex === true} />,
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
    delete attributes['onBlur']
    attributes['className'] = 'form-control'
    attributes['selected'] = this.props.valuex ? new Date(this.props.valuex) : null
    attributes['onChange'] = (date) => {
      if (date) {
        this.baseHandler(date.toISOString())
      } else {
        this.baseHandler('')
      }
    }
    return this.toFormInput(<DatePicker {...attributes} />, column, attributes)
  }

  /**
   *
   * @param {Column} column
   * @param {*} attributes
   */
  makeForeign = (column, attributes) => {
    delete attributes.value
    let selectOptions = []

    column.requestOptions().then((response) => {
      response.data.results.forEach((row) => {
        selectOptions.push({
          label: row.username,
          value: row.id,
        })
      })
    })

    return this.toFormInput(
      <Select
        name={column.name}
        value={selectOptions.find((item) => item.value === this.props.valuex)}
        isSearchable
        options={selectOptions}
        onChange={(e) => {
          this.baseHandler(e.value)
        }}
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
  makeSimpleInput = (column, attributes) => {
    attributes['placeholder'] = this.props.valuex
    return this.toFormInput(<CFormInput {...attributes} />, column, attributes)
  }

  /**
   *
   * @param {Column} column
   */
  generateField = (column) => {
    let attributes = {
      name: column.name,
      type: column.format,
      onBlur: (e) => {
        this.baseHandler(e.target.value)
      },
    }
    let result = null
    this.columnName = column.name

    if (!column.filterable) {
      attributes['disabled'] = true
    }

    switch (column.format) {
      case Column.FORMAT_CHECKBOX:
        result = this.makeCheckbox(column, attributes)
        break
      case Column.FORMAT_DATE:
        result = this.makeDate(column, attributes)
        break
      case Column.FORMAT_DATETIME:
        attributes['showTimeSelect'] = true
        attributes['dateFormat'] = 'Pp'
        result = this.makeDate(column, attributes)
        break
      case Column.FORMAT_MULTISELECT:
        attributes['isMulti'] = true
        result = this.makeSelect(column, attributes)
        break
      case Column.FORMAT_SELECT:
        result = this.makeSelect(column, attributes)
        break
      case Column.FORMAT_FOREIGN:
        result = this.makeForeign(column, attributes)
        break
      case Column.FORMAT_FILE:
      case Column.FORMAT_IMAGE:
      case Column.FORMAT_JSON:
      case Column.FORMAT_RADIO:
      case Column.FORMAT_TEXTAREA:
      case Column.FORMAT_EMAIL:
      case Column.FORMAT_NUMBER:
      case Column.FORMAT_PASSWORD:
      case Column.FORMAT_ENUM:
      case Column.FORMAT_ID:
      case Column.FORMAT_TEXT:
      default:
        attributes['type'] = 'text'
        result = this.makeSimpleInput(column, attributes)
        break
    }
    return result
  }

  render = () => {
    return this.generateField(this.props.column)
  }
}

export default FilterGenerator
