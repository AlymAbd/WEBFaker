import { Column } from '../../models/items'
import Component from '../abstract/Component'
import { cilMinus, cilCheckAlt } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'

class CellGenerator extends Component {
  constructor(props) {
    super(props)
  }

  templateBoolean = (column, value) => {
    return <CIcon icon={column.serialize(value) ? cilCheckAlt : cilMinus} size="xl" />
  }

  templateDate = (column, value) => {
    if (value) {
      return column.toNormalDate(value)
    }
    return ' '
  }

  templateDateTime = (column, value) => {
    if (value) {
      return column.toNormalDate(value)
    }
    return ' '
  }

  templateNumber = (column, value) => {
    return String(value)
  }

  templateText = (column, value) => {
    if (value) {
      return String(value)
    }
    return ' '
  }

  templateTextarea = (column, value) => {
    return String(value)
  }

  templateLink = (column, href, value) => {
    return <a href={href}>{value}</a>
  }

  templatePills = (column, value) => {
    return value
  }

  templateImage = (column, value) => {
    return value
  }

  templatePassword = (column, value) => {
    return '*************'
  }

  cellTemplate = (column, value) => {
    let cell = ''
    let href = ''
    switch (column.format) {
      case Column.FORMAT_CHECKBOX:
        cell = this.templateBoolean(column, value)
        break
      case Column.FORMAT_DATE:
        cell = this.templateDate(column, value)
        break
      case Column.FORMAT_DATETIME:
        cell = this.templateDateTime(column, value)
        break
      case Column.FORMAT_EMAIL:
        href = 'malito:' + value
        cell = this.templateLink(column, href, value)
        break
      case Column.FORMAT_FILE:
        cell = this.templateLink(column, value, value)
        break
      case Column.FORMAT_FOREIGN:
        let label = ''
        if (value !== null && typeof value === 'object' && value.name) {
          if (value.title) {
            label = value.title
          } else {
            label = value.name
          }
          value = value.name
        } else {
          value = ''
        }
        href = new column.foreign().route + '/' + value
        cell = this.templateLink(column, href, label)
        break
      case Column.FORMAT_ID:
        href = this.routeToDetail + '/' + value
        cell = this.templateLink(column, href, value)
        break
      case Column.FORMAT_IMAGE:
        cell = this.templateImage(column, value)
        break
      case Column.FORMAT_ENUM:
      case Column.FORMAT_MULTISELECT:
        cell = this.templatePills(column, value)
        break
      case Column.FORMAT_PASSWORD:
        cell = this.templatePassword(column, value)
        break
      case Column.FORMAT_NUMBER:
        cell = this.templateNumber(column, value)
        break
      case Column.FORMAT_TEXTAREA:
        cell = this.templateTextarea(column, value)
        break
      case Column.FORMAT_TEXT:
      case Column.FORMAT_JSON:
      case Column.FORMAT_RADIO:
      case Column.FORMAT_SELECT:
      default:
        cell = this.templateText(column, value)
        break
    }
    return cell
  }
}

export default CellGenerator
