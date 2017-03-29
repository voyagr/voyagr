import React, { Component } from 'react'
import { Alert, FormControl, FormGroup, ControlLabel, FieldGroup, Form, Col, Button } from 'react-bootstrap'
import { auth } from 'APP/db/firebase'
import { browserHistory } from 'react-router'

export default class Login extends Component {
  constructor () {
    super()
    this.state = Object.assign({}, {
      email: '',
      password: '',
      showInvalidAlert: false,
    })

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFailedLogin () {
    return (
      <Alert bsStyle="danger">
        <h4>Email and/or password is invalid.</h4>
      </Alert>
    )
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
      showInvalidAlert: false,
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      // redirect to timeline on successful log in
      .then(() => browserHistory.push("/timeline"))
      .catch(error => this.setState({ showInvalidAlert: true, }))
  }

  render () {
    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              Email
            </Col>
            <Col sm={4}>
              <FormControl onChange={this.handleChange} type="email" name="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              Password
            </Col>
            <Col sm={4}>
              <FormControl onChange={this.handleChange} type="password" name="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={4} sm={10}>
              <Button type="submit" value="Login">
                Log In
              </Button>
            </Col>
          </FormGroup>
        </Form>

        {this.state.showInvalidAlert ? this.handleFailedLogin() : null}
      </div>
    )
  }
}
