import React, { Component } from 'react'
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock } from 'react-bootstrap'
import { inviteUser } from 'APP/app/components/utils/inviteUser'
import { auth } from 'APP/db/firebase'

export default class InviteUser extends Component {
	constructor(props) {
		super()

		this.state = {
			email: '',
			showInvalidAlert: false,
			showSuccessAlert: false,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInvalidEmail = this.handleInvalidEmail.bind(this)
		this.handleSuccess = this.handleSuccess.bind(this)
	}

	handleChange (event) {
		this.setState({
			email: event.target.value,
			showInvalidAlert: false,
			showSuccessAlert: false,
	 })
	}

	handleSubmit (event) {
		event.preventDefault()
		console.log(event)
		inviteUser(this.state.email, this.props.tripId)
			.then(status => {
				if (status) {
					this.setState({ showInvalidAlert: true, })
				} else {
					this.setState({ showSuccessAlert: true, })
				}
			})
	}

	handleInvalidEmail () {
		return (
			<Alert bsStyle="danger">
				<p>There is no user registered with that email address.</p>
			</Alert>
		)
	}

	handleSuccess () {
		return (
			<Alert bsStyle="success">
				<p>User can now collaborate on this trip.</p>
			</Alert>
		)
	}

	render () {
		return (
			<div>
				<h4>Invite To Edit</h4>
				<Form horizontal onSubmit={this.handleSubmit}>
					<FormGroup controlId="email">
						<Col componentClass={ControlLabel} sm={3}>
							Email
						</Col>
						<Col sm={9}>
							<FormControl
								type="email"
								name="email"
								placeholder="friend@flashback.biz"
								onChange={this.handleChange}
							/>
							<HelpBlock>
								The email must already be associated with a Voyagr account.
							</HelpBlock>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={3} sm={10}>
							<Button type="submit" value="Submit">
								Invite
							</Button>
						</Col>
					</FormGroup>
					{this.state.showInvalidAlert ? this.handleInvalidEmail() : null}
					{this.state.showSuccessAlert ? this.handleSuccess() : null}
				</Form>
			</div>
		)
	}
}
