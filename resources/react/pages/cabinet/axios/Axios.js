import { Component } from 'react'
import { CInputGroup, CRow, CButton, CFormInput, CCard, CFormSelect, CCardBody, CInputGroupText, CCol, CFormTextarea } from '@coreui/react'
import { base } from '@r/service/axios'
import { APP_URL } from '@r/service/config'
import { JSONTree } from 'react-json-tree'

class Axios extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      method: 'GET',
      parameters: '',
      result: '',
    }

    this.handleRequest = this.handleRequest.bind(this)
  }

  handleInput = (e) => {
    this.state[e.target.name] = e.target.value
    this.setState(this.state)
  }

  handleRequest = (event) => {
    event.preventDefault()
    const axios = this.getAxios()
    let params = this.state.parameters
    if (this.state.method !== 'GET') {
      params = JSON.parse(this.state.parameters)
    }
    axios(this.state.url, params)
      .then((response) => {
        if (response.headers['content-type'] == 'application/json') {
          this.setState({ result: response })
        } else {
          this.setState({ result: String(response) })
        }
      })
      .catch((error) => {
        console.log(error)
        let result = error
        delete result.stack
        switch (error.response.status ?? 500) {
          case 400:
            result = error.response.data
            break
        }
        this.setState({ result: result, status: error.response.status })
      })
  }

  getAxios = () => {
    let axios = null
    switch (this.state.method) {
      case 'GET':
        axios = this.requestGet()
        break
      case 'POST':
        axios = this.requestPost()
        break
      case 'PUT':
        axios = this.requestPut()
        break
      case 'DELETE':
        axios = this.requestDelete()
        break
    }
    return axios
  }

  requestPost = () => {
    return base.post
  }

  requestPut = () => {
    return base.put
  }

  requestGet = () => {
    return base.get
  }

  requestDelete = () => {
    return base.delete
  }

  render() {
    return (
      <div>
        <CRow className="mb-3">
          <CCol md={10} lg={7} xl={8}>
            <CRow>
              Result:&nbsp;<JSONTree data={this.state.result}></JSONTree>
            </CRow>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={9} lg={7} xl={6}>
            <CCard>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <span>Method</span>
                  </CInputGroupText>
                  <CFormSelect
                    options={[
                      { label: 'GET', value: 'GET' },
                      { label: 'POST', value: 'POST' },
                      { label: 'PUT', value: 'PUT' },
                      { label: 'DELETE', value: 'DELETE' },
                    ]}
                    onChange={this.handleInput}
                    name="method"
                  ></CFormSelect>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <span>{APP_URL}</span>
                  </CInputGroupText>
                  <CFormInput placeholder="URL" name="url" onChange={this.handleInput} />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <span>Parameters</span>
                  </CInputGroupText>
                  <CFormTextarea rows={5} name="parameters" onChange={this.handleInput} />
                </CInputGroup>
                <div className="d-grid">
                  <CButton color="success" onClick={this.handleRequest}>
                    Request
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    )
  }
}

export default Axios
