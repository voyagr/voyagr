import React from 'react'
import {Button} from 'react-bootstrap'

const ViewEditToggle = (props) =>
  <Button onClick={props.toggleMode}>
    {props.editable ? 'View' : 'Edit' }
  </Button>

export default ViewEditToggle
