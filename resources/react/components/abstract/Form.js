import AbsComponent from './Component'

export default class AbsFormDetail extends AbsComponent {
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
