import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel, FieldGroup } from 'react-bootstrap'



export default function (props) {
  return (
    <FormGroup controlId="basic form">
      <ControlLabel>Email</ControlLabel>
      <FieldGroup id="formControlsEmail" type="email" placeHolder="Email Address" />
      <ControlLabel>Password</ControlLabel>
      <FieldGroup id="formControlsPassword" type="password" placeHolder="password" />
    </FormGroup>
    )
  }
