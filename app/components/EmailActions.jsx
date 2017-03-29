import React, {Component} from 'react'
import { auth } from 'APP/db/firebase'
import { Button, Alert } from 'react-bootstrap'

export default class EmailActions extends Component {
  constructor (props) {
    super()

    this.state = {
      emailVerified: false,
      newEmailSent: false,
    }

    this.handleVerifyEmail = this.handleVerifyEmail.bind(this)
    this.getParameterByName = this.getParameterByName.bind(this)
    this.emailVerified = this.emailVerified.bind(this)
    this.sendNewVerificationEmail = this.sendNewVerificationEmail.bind(this)
    this.newVerificationEmailSent = this.newVerificationEmailSent.bind(this)
  }

  getParameterByName (name) {
    const url = window.location.href

    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, " "))
  }

  handleVerifyEmail () {
    const actionCode = this.getParameterByName('oobCode')
    // Try to apply the email verification code.
    auth.applyActionCode(actionCode).then(resp => {
      this.setState({ emailVerified: true })
      // Email address has been verified.
      console.log(this.state)

    }).catch(error => {
      // this.emailVerified()
      console.error(error)
    })
  }

  goToTimeline () {
    location.href='/timeline'
  }

  emailVerified () {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>Your email has been successfully verified.</h3>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.goToTimeline}
        >
          Start capturing your memories
        </Button>
      </div>
    )
  }

  emailNotVerified () {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>Your email could not be verified. Click below to receive a new confirmation link.</h3>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.sendNewVerificationEmail}
          style={{ color: 'black' }}
        >
          Resend confirmation email
        </Button>
      </div>
    )
  }

  sendNewVerificationEmail () {
    console.log('test')
    auth.currentUser ? auth.currentUser.sendEmailVerification()
      .then(() => this.setState({ newEmailSent: true }))
      .catch(console.error) : null
  }

  newVerificationEmailSent () {
    return (
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <h4>Please check your email for a new confirmation link.</h4>
      </div>
    )
  }

  render () {
    let alertStyle
    if (this.state.emailVerified) alertStyle='success'
    else alertStyle='danger'

    return (
      <Alert bsStyle={alertStyle} style={{ margin: '100px', padding: '100px' }}>
        {this.handleVerifyEmail()}
        {this.state.emailVerified ? this.emailVerified() : this.emailNotVerified()}
        {this.state.newEmailSent ? this.newVerificationEmailSent() : null}
      </Alert>
    )
  }
}
