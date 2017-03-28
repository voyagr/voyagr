import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import { editBackgroundColor, editTextColor } from '../reducers/elements'

class EditElement extends Component {

  constructor (props) {
    super(props)

    this.handleBackgroundChange = this.handleBackgroundChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
  }

  handleBackgroundChange (event) {
    console.log(event.target)

    if (!event.target.value) event.target.value = "none"

    let elementToUpdate = {
      id: this.props.elementId,
      background: event.target.value
    }

    this.props.editBackgroundColor(elementToUpdate)
  }

  handleColorChange (event) {
    let elementToUpdate = {
      id: this.props.elementId,
      color: event.target.value
    }
    this.props.editTextColor(elementToUpdate)
  }

  render () {
    return (
      <div>
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select New Size</ControlLabel>
        <FormControl onChange={this.props.handleSizeChange} value={this.props.selectedElement.size} componentClass="select" placeholder="select">
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </FormControl>

        <hr />
        <ControlLabel>Select a new background color</ControlLabel>
        <input onChange={this.handleBackgroundChange} type="color" />
        <Button onClick={this.handleBackgroundChange}>No background</Button>
        <hr />
        <ControlLabel>Select a new text color</ControlLabel>
        <input onChange={this.handleColorChange} type="color" />

      </FormGroup>


      </div>
    )
  }
}


export default connect(state => state, { editBackgroundColor, editTextColor })(EditElement)

