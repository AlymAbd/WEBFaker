import AbsComponent from '../abstract/Component'

export default class FormComponent extends AbsComponent {
  constructor(props) {
    super(props)
    let { id } = props.params
    this.state = {
      id: id,
    }
  }

  onSubmitCallback = (response) => {
    //
  }

  onFailSubmitCallback = (response) => {
    //
  }

  onUploadCallback = (response) => {
    //
  }

  onFailUploadCallback = (response) => {
    //
  }
}
