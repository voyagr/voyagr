import React, {Component} from 'react'
import { auth } from 'APP/db/firebase'
import { Button, Alert } from 'react-bootstrap'

export default class EmailActions extends Component {
  constructor (props) {
    super()

    this.state = {
      emailVerified: null,
      newEmailSent: false,
    }

    this.handleVerifyEmail = this.handleVerifyEmail.bind(this)
    this.getParameterByName = this.getParameterByName.bind(this)
    this.emailVerified = this.emailVerified.bind(this)
    this.sendNewVerificationEmail = this.sendNewVerificationEmail.bind(this)
    this.newVerificationEmailSent = this.newVerificationEmailSent.bind(this)
  }

  componentWillMount () {
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

  }

  goToTimeline () {
    location.href='/timeline'
  }

  emailVerified () {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>Your email has been successfully verified.</h3>
        <Button
          bsSize="large"
          onClick={this.goToTimeline}
          className="btn"
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
          bsSize="large"
          onClick={this.sendNewVerificationEmail}
          className="btn"
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
    if (this.state.emailVerified === false) alertStyle='danger'
    else alertStyle='success'

    return (
      <Alert bsStyle={alertStyle} style={{ margin: '100px', padding: '100px' }}>
        {this.state.emailVerified === false ? this.emailNotVerified() : this.emailVerified()}
        {this.state.newEmailSent ? this.newVerificationEmailSent() : null}
      </Alert>
    )
  }
}
