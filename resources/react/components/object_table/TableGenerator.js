import CellGenerator from './CellGenerator'
import { CButton, CButtonToolbar, CRow, CCol, CTable, CButtonGroup, CFormInput } from '@coreui/react'

import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilCircle, cilXCircle } from '@coreui/icons'

import FilterGenerator from './FilterGenerator'

const t = global.$t

class TableGenerator extends CellGenerator {
  constructor(props) {
    super(props)

    this.model = new props.model()
    this.title = this.getProp('modelTitle', this.model.title)
    this.description = this.getProp('modelDescription', this.model.description)
    this.getAllColumns = this.getProp('getAllColumns', false)
    this.routeToDetail = this.getProp('routeToDetail', '/')
    this.routeToCreate = this.getProp('routeToCreate', null)

    this.state = {
      _queryParams: {
        limit: 10,
        page: 1,
        other: '',
        previous: false,
        next: false,
        from: 1,
        lastPage: 1,
        total: 0,
        sortBy: '',
        sortDest: '',
        filters: {},
      },
      pagination: [],
      columns: [],
      columnsToRequest: [],
      items: [],
    }
  }

  componentDidMount = () => {
    this.createFilterState()
    this.requestTable()
  }

  createFilterState = () => {
    this.model.getColumns().forEach((row) => {
      this.state._queryParams.filters[row.name] = ''
    })
    this.setState({ _queryParams: this.state._queryParams })
  }

  columnsToRender = () => {
    return this.model.getColumns()
  }

  getSortIcon = (column) => {
    let icon = cilCircle
    if (column.name === this.state._queryParams.sortBy) {
      switch (this.state._queryParams.sortDest) {
        case 'asc':
          icon = cilArrowCircleBottom
          break
        case 'desc':
          icon = cilArrowCircleTop
          break
        default:
          icon = cilCircle
          break
      }
    } else if (!column.sortable) {
      icon = cilXCircle
    }
    return <CIcon icon={icon} />
  }

  requestTable = () => {
    this.generateHeader()

    return this.model
      .getRecords(
        this.state._queryParams.limit,
        this.state._queryParams.page,
        this.state._queryParams.sortBy,
        this.state._queryParams.sortDest,
        this.state._queryParams.filters,
      )
      .then((response) => {
        this.preparePagination(response.data)
        this.generateRows(response.data.results)
      })
  }

  // table
  rowHeaderTemplate = (row) => {
    let icon = this.getSortIcon(row)
    return {
      key: row.name,
      label: (
        <div>
          <CRow className="mb-3">
            <CCol>
              <FilterGenerator
                key={row.name + '__' + this.state._queryParams.filters[row.name]}
                valuex={this.state._queryParams.filters[row.name]}
                column={row}
                updateStateCallback={this.filterByColumn}
              />
            </CCol>
          </CRow>
          <CRow>
            <div
              onClick={() => {
                this.sortByColumn(row)
              }}
            >
              <div className="align-text-top">{row.title}</div>
              {icon}
            </div>
          </CRow>
        </div>
      ),
      _props: { scope: 'col', color: 'primary', style: { cursor: 'pointer' } },
    }
  }

  generateHeader = () => {
    this.state.columnsToRequest = []
    this.state.columns = []
    this.columnsToRender().forEach((column) => {
      this.state.columnsToRequest.push(column.name)
      this.state.columns.push(this.rowHeaderTemplate(column))
    })
    this.setState({ columns: this.state.columns })
  }

  generateRows = (rows) => {
    this.state.items = []
    rows.forEach((row) => {
      let rowItem = {}
      Object.keys(row).forEach((columnName) => {
        let column = this.model.getColumn(columnName)
        if (column) {
          rowItem[columnName] = this.cellTemplate(column, row[columnName])
        }
      })
      this.state.items.push(rowItem)
    })
    this.setState({ items: this.state.items })
  }
  // end table

  // pagination & sorting
  sortByColumn = (column) => {
    const colName = column.name
    if (!colName) {
      this.state._queryParams.sortDest = null
      this.state._queryParams.sortBy = null
    } else if (!column.sortable) {
      return
    } else {
      this.state._queryParams.sortBy = colName
      switch (this.state._queryParams.sortDest) {
        case 'desc':
          this.state._queryParams.sortDest = null
          this.state._queryParams.sortBy = null
          break
        case 'asc':
          this.state._queryParams.sortDest = 'desc'
          break
        default:
          this.state._queryParams.sortDest = 'asc'
          break
      }
    }

    this.setState({ _queryParams: this.state._queryParams }, () => {
      this.requestTable()
    })
  }

  paginate = (e) => {
    let page = this.state._queryParams.page
    switch (e.target.value) {
      case 'prev':
        page--
        break
      case 'next':
        page++
        break
      default:
        page = e.target.value
        break
    }
    if (this.state._queryParams.page != page) {
      this.state._queryParams['page'] = page
      this.setState({ _queryParams: this.state._queryParams }, () => {
        this.requestTable()
      })
    }
  }

  preparePagination = (data) => {
    if (!data) {
      return
    }
    this.state._queryParams.next = data.next !== null
    this.state._queryParams.previous = data.previous !== null
    this.state._queryParams.page = data.current_page
    this.state._queryParams.from = data.start
    this.state._queryParams.lastPage = data.num_pages
    this.state._queryParams.total = data.count

    this.state.pagination = []
    for (let ind = 0; ind < (this.state._queryParams.lastPage > 10 ? 10 : this.state._queryParams.lastPage); ind++) {
      this.state.pagination.push(
        <CButton value={ind + 1} key={'pagination_' + ind} onClick={this.paginate} disabled={ind + 1 == this.state._queryParams.page}>
          {ind + 1}
        </CButton>,
      )
    }
    this.setState({ _queryParams: this.state._queryParams, pagination: this.state.pagination })
  }
  // end pagination

  // filtration
  filterByColumn = (obj) => {
    this.state._queryParams.filters[obj.column] = obj.value
    this.setState({ _queryParams: this.state._queryParams }, () => {
      console.log(this.state._queryParams.filters)
      this.requestTable()
    })
  }

  clearFilter = () => {
    this.createFilterState()
    this.setState({ _queryParams: this.state._queryParams }, () => {
      this.requestTable()
    })
  }
  // end filtration

  render() {
    return (
      <CCol>
        <CRow className="mb-2">
          <CCol xs={3}>
            <CButtonGroup role="group">
              <CButton color="danger" onClick={this.clearFilter}>
                {t('Clear filters')}
              </CButton>
              <CButton color="warning" onClick={this.clearFilter}>
                {t('Clear ordering')}
              </CButton>
              <CButton color="alert" href={this.routeToCreate} style={{ display: this.routeToCreate ? '' : 'none' }}>
                {t('Create')}
              </CButton>
            </CButtonGroup>
          </CCol>
        </CRow>
        <CRow>
          <div className="table-responsive-lg">
            <CTable hover bordered columns={this.state.columns} items={this.state.items}>
              <caption>{t('From') + ': ' + this.state._queryParams.total}</caption>
            </CTable>
          </div>
        </CRow>
        <CRow className="mb-2">
          <CCol>
            <CRow>
              <CButtonToolbar role="group" aria-label="Toolbar with button groups">
                <CButtonGroup className="me-2" role="group" aria-label="First group">
                  <CButton color="info" disabled={this.state._queryParams.previous === false} onClick={this.paginate} value="prev">
                    {t('Prev')}
                  </CButton>
                  <CButton color="info" disabled={this.state._queryParams.next === false} onClick={this.paginate} value="next">
                    {t('Next')}
                  </CButton>
                </CButtonGroup>
                <CButtonGroup className="me-2" role="group" aria-label="Second group">
                  <CButtonGroup>{this.state.pagination}</CButtonGroup>
                </CButtonGroup>
              </CButtonToolbar>
            </CRow>
          </CCol>
        </CRow>
      </CCol>
    )
  }
}

export default TableGenerator
