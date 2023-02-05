import { Component } from 'react'

class AbsComponent extends Component {
  getProp = (name, onelse = null) => {
    return this.props.hasOwnProperty(name) ? (this.props[name] !== null ? this.props[name] : onelse) : onelse
  }
}

export default AbsComponent
