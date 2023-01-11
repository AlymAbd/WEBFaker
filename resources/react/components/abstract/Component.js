import { Component } from 'react'

class AbstractComponent extends Component {
  getProp = (name, onelse = null) => {
    return this.props.hasOwnProperty(name) ? (this.props[name] !== null ? this.props[name] : onelse) : onelse
  }
}

export default AbstractComponent
