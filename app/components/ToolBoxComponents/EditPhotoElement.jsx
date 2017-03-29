import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

export default class EditElement extends Component {

  render () {
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select New Size</ControlLabel>
        <FormControl value={this.props.selectedElement.size} onChange={this.props.handleSizeChange}  componentClass="select" placeholder="select">
          <option value="native">Original Size</option>
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </FormControl>
      </FormGroup>
    )
  }
}
