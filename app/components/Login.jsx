import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel, FieldGroup, Form, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { login } from '../reducers/user'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, {
      email: '',
      password: '',
    })

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const value = e.target.value
    const name = e.target.name
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.login(this.state.email, this.state.password)
  }

  render() {
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
      </div>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, { login })(Login)
