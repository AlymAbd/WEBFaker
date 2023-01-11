import { session } from '@r/service/axios'
import { CJSON, Column } from './columns'

class Model {
  route = ''
  description = ''
  columns = []

  getColumns = (getAll = false) => {
    if (getAll) {
      return this.columns
    } else {
      return this.columns.filter((row) => {
        return !row.hidden
      })
    }
  }

  getColumn = (name, fromAll = true) => {
    return this.getColumns(fromAll).find((row) => {
      return row.name == name
    })
  }

  getColumnValues = (columns = null, validation = false) => {
    let cols = {}
    columns = columns ? columns : this.getColumns()
    columns.forEach((row) => {
      cols[row.name] = validation ? '' : row.getValueOrDefault()
      if (row instanceof CJSON) {
        if (validation) {
          cols = { ...cols, ...row.getSchemeValidation(validation) }
        } else {
          cols = { ...cols, ...row.getSchemeValues() }
        }
        delete cols[row.name]
      }
    })
    return cols
  }

  getColumnState = (columns) => {
    let cols = {}
    columns = columns ? columns : this.columns
    columns.forEach((row) => {
      if (!row.hidden) {
        cols[row.name] = row
      }
      if (row instanceof CJSON) {
        cols = { ...cols, ...row.getScheme() }
      }
    })
    return cols
  }

  getRoute = (param = null) => {
    let url = this.route
    if (param) {
      url = url + '/detail/' + param
    }
    return url
  }

  handleData = (modelState) => {
    let data = {}
    Object.keys(modelState).forEach((column) => {
      if (column.includes('__')) {
        let jsonKey = column.split('__')[0]

        if (!data.hasOwnProperty(jsonKey) || !(data[jsonKey] instanceof Object)) {
          data[jsonKey] = {}
        }

        data[jsonKey][column.split('__')[1]] = modelState[column]
      } else {
        data[column] = modelState[column]
      }
    })
    return data
  }

  // API Handlers block
  prepareColumns = (data) => {
    Object.keys(data).forEach((row) => {
      if (data[row] !== null && typeof data[row] === 'object') {
        Object.keys(data[row]).forEach((subRow) => {
          data[row + '__' + subRow] = data[row][subRow]
        })
        delete data[row]
      }
    })
    return data
  }

  applyValues = (data) => {
    this.prepareColumns(data)
    this.getColumns(true).forEach((column) => {
      switch (column.format) {
        case Column.FORMAT_FOREIGN:
          column.setValue(data[column.name + '__name'])
          break
        case Column.FORMAT_JSON:
          column.scheme.forEach((jsonCol) => {
            jsonCol.setValue(data[jsonCol.name] !== undefined || data[jsonCol.name] !== null ? data[jsonCol.name] : jsonCol.default)
          })
          break
        default:
          column.setValue(data[column.name])
          break
      }
    })
  }

  getAllRecords = (limit = 10, page = 1, orderBy = null, orderDest = 'asc', otherFilters = null) => {
    let filters = ['limit=' + limit, 'page=' + page]
    if (orderBy) {
      filters = filters.concat(filters, ['order_by=' + orderBy, 'order_dest=' + orderDest])
    }
    if (otherFilters) {
      filters.concat(filters, otherFilters)
    }

    return new Promise((resolve, reject) => {
      session
        .get(this.getRoute() + '/?' + filters.join('&'))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getDetailRecord = (id, relations = null) => {
    let route = this.getRoute(id)
    if (relations) {
      if (Array.isArray(relations)) {
        relations.forEach((rel) => {
          route = route + '/?with[]=' + rel
        })
      } else {
        route = route + '/?with=' + relations
      }
    }
    return new Promise((resolve, reject) => {
      session
        .get(route)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  createRecord = (data) => {
    return new Promise((resolve, reject) => {
      session
        .post(this.getRoute(), data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  updateRecord = (data, id) => {
    return new Promise((resolve, reject) => {
      session
        .put(this.getRoute(id), data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  uploadFile = (formData, id) => {
    return new Promise((resolve, reject) => {
      session
        .post(this.getRoute(id), formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ContentType: 'multipart/form-data',
          },
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  deleteRecord = (id) => {
    return new Promise((resolve, reject) => {
      session
        .delete(this.getRoute(id))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get title() {
    return ''
  }

  get description() {
    return this.description
  }

  get methods() {
    return this.methods
  }

  get route() {
    return '/#/cabinet' + this.route
  }
}

export default Model
