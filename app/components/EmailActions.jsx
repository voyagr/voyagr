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

    this.emailVerified = this.emailVerified.bind(this)
    this.sendNewVerificationEmail = this.sendNewVerificationEmail.bind(this)
    this.newVerificationEmailSent = this.newVerificationEmailSent.bind(this)
  }

  componentWillMount () {
    const actionCode = this.getParameterByName('oobCode')
    // try to apply the email verification code.
    auth.applyActionCode(actionCode).then(resp => {
      // email address has been verified.
      this.setState({ emailVerified: true, })
    }).catch(error => console.error)
  }

  // get the verification code from url query
  getParameterByName (name) {
    const url = window.location.href

    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, " "))
  }

  goToTimeline () {
    location.href='/timeline'
  }

  emailVerified () {
    return (
      <div>
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
      <div>
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
    auth.currentUser ? auth.currentUser.sendEmailVerification()
      .then(() => this.setState({ newEmailSent: true, }))
      .catch(console.error) : null
  }

  newVerificationEmailSent () {
    return (
      <div style={{ margin: '20px', }}>
        <h4>Please check your email for a new confirmation link.</h4>
      </div>
    )
  }

  render () {
    let alertStyle
    if (this.state.emailVerified === false) alertStyle='danger'
    else alertStyle='success'

    return (
      <Alert bsStyle={alertStyle} style={{ margin: '100px', padding: '100px', }}>
        {this.state.emailVerified === false ? this.emailNotVerified() : this.emailVerified()}
        {this.state.newEmailSent ? this.newVerificationEmailSent() : null}
      </Alert>
    )
  }
}
