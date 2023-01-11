import CellGenerator from './CellGenerator'
import { CButton, CButtonToolbar, CRow, CCol, CTable, CButtonGroup } from '@coreui/react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'

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
        last_page: 1,
        total: 0,
        displayed: 0,
        sortBy: '',
        sortDest: '',
        sortIcon: '',
      },
      pagination: [],
      columns: [],
      columnsToRequest: [],
      items: [],
    }
  }

  componentDidMount = () => {
    this.generateHeader()
    this.requestTable()
  }

  getOtherFilters = () => {
    return ''
  }

  columnsToRender = () => {
    return this.model.getColumns()
  }

  requestTable = () => {
    return this.model
      .getAllRecords(
        this.state._queryParams.limit,
        this.state._queryParams.page,
        this.state._queryParams.sortBy,
        this.state._queryParams.sortDest,
        this.getOtherFilters(),
      )
      .then((response) => {
        this.preparePagination(response.data)
        this.generateRows(response.data.data)
      })
  }

  // table
  rowHeaderTemplate = (row) => {
    let sortIcon = ''
    if (this.state.sortBy == row.name) {
      if (this.state.sortDest === 'asc') {
        sortIcon = <CIcon icon={cilArrowCircleBottom} />
      } else {
        sortIcon = <CIcon icon={cilArrowCircleTop} />
      }
    }
    let rawRow = {
      key: row.name,
      label: (
        <div>
          <CRow>
            <div id={'headercell__' + row.name} className="align-text-top" onClick={this.sortByColumn}>
              {row.title}
            </div>
          </CRow>
          <CRow>
            <span className="float-end me-1">{sortIcon}</span>
          </CRow>
        </div>
      ),
      _props: { scope: 'col', color: 'dark', style: { cursor: 'pointer' } },
    }
    return rawRow
  }

  generateHeader = () => {
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
  //

  // pagination & sorting
  sortByColumn = (e) => {
    let colName = e.target.id.split('__')[1]
    if (this.state._queryParams.sortBy == colName) {
      switch (this.state._queryParams.sortDest) {
        case 'desc':
          this.state._queryParams.orderDest = null
          colName = null
          break
        case 'asc':
          this.state._queryParams.orderDest = 'desc'
          break
        default:
          this.state._queryParams.orderDest = 'asc'
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
    this.state._queryParams.next = data.next_page_url !== null
    this.state._queryParams.previous = data.prev_page_url !== null
    this.state._queryParams.page = data.current_page
    this.state._queryParams.from = data.from
    this.state._queryParams.last_page = data.last_page
    this.state._queryParams.total = data.total
    this.state._queryParams.displayed = data.to

    this.state.pagination = []
    for (let ind = 0; ind < (this.state._queryParams.last_page > 10 ? 10 : this.state._queryParams.last_page); ind++) {
      this.state.pagination.push(
        <CButton value={ind + 1} key={'pagination_' + ind} onClick={this.paginate} disabled={ind + 1 == this.state._queryParams.page}>
          {ind + 1}
        </CButton>,
      )
    }
    this.setState({ _queryParams: this.state._queryParams, pagination: this.state.pagination })
  }
  //

  render() {
    return (
      <CCol>
        <CRow className="mb-1">
          <CCol xs={1}>
            <CButton href={this.routeToCreate} style={{ display: this.routeToCreate ? '' : 'none' }}>
              {t('Create')}
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <div className="table-responsive-lg">
            <CTable hover bordered columns={this.state.columns} items={this.state.items}>
              <caption>
                {t('Displayed records') + ': ' + this.state._queryParams.displayed}
                <div></div>
                {t('From') + ': ' + this.state._queryParams.total}
              </caption>
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
