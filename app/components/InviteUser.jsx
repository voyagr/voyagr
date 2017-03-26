import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock } from 'react-bootstrap'
import { database } from 'APP/db/firebase'

import { inviteUser } from 'APP/app/components/utils/inviteUser'

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
				<p>There is no user registered with that e-mail address.</p>
			</Alert>
		)
	}

	handleValidEmail () {
		return (
			<Alert bsStyle="success">
				<p>User can now collaborate on this trip.</p>
			</Alert>
		)
	}

	render () {
		return (
			<div>
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
					{this.state.showSuccessAlert ? this.handleValidEmail() : null}
				</Form>
			</div>
		)
	}
}
