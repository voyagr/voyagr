import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel, FieldGroup, Form, Col, Button } from 'react-bootstrap'



export default class Signup extends Component {
  render () {
  return (
    <div>
  <Form horizontal onSubmit={evt => {
    evt.preventDefault()

  } }>

    <FormGroup controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} smOffset={2} sm={2}>
        Email
      </Col>
      <Col sm={4}>
        <FormControl type="email" name='email' placeholder="Email" />
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} smOffset={2} sm={2}>
        Password
      </Col>
      <Col sm={4}>
        <FormControl type="password" name='password' placeholder="Password" />
      </Col>
    </FormGroup>

    <FormGroup>
      <Col smOffset={4} sm={10}>
        <Button type="submit" value="Login">
          Sign Up
        </Button>
      </Col>
    </FormGroup>
  </Form>
  </div>
    )
  }
  }
