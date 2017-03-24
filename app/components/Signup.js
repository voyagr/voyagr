import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel, FieldGroup, Form, Col, Button } from 'react-bootstrap'
import { database, auth } from 'APP/db/firebase'

class Signup extends Component {
  constructor(){
    super()
    this.state = Object.assign({}, {
      name: '',
      email: '',
      password: '',
    })

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    const value = e.target.value
    const name = e.target.name
    this.setState({[name]: value});
  }

  handleSubmit(e){
    e.preventDefault()
    auth
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          user.updateProfile({
            displayName: this.state.name,
          })
          .then(() => user.sendEmailVerification())
          .then(() => {
            console.log(this.state)
            database
            .ref(`users/${user.uid}`)
            .set({
              name: this.state.name,
              email: this.state.email,
            })
          })
          .catch(error => {
            console.log('NESTED ERROR', error.code, error.message)
          })
        } else console.log('NO USER')
      })
    })
    .catch(function(error) {
      if (error.code === 'auth/weak-password') {
          alert('The password is too weak.')
        } else {
          alert(error.message)
        }
        console.log('ERROR', error.code, error.message)
    })

  }

  render () {
    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>

          <FormGroup controlId="formName">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              Name
            </Col>
            <Col sm={4}>
              <FormControl onChange={this.handleChange} type="name" name="name" placeholder="'Jane' or 'Ms. Way'" />
            </Col>
          </FormGroup>

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
              <Button type="submit" value="Signup">
                Sign Up
              </Button>
            </Col>
          </FormGroup>

        </Form>
    </div>
    )
  }
}

export default Signup
