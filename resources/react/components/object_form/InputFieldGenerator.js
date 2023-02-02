import CIcon from '@coreui/icons-react'

import FieldGenerator from './FieldGenerator'

class InputFieldGenerator extends FieldGenerator {
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
}

export default InputFieldGenerator
