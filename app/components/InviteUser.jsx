import React, { Component } from 'react'
import { Button, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap'
import { database } from 'APP/db/firebase'

import { inviteUser } from 'APP/app/components/utils/inviteUser'

export default class InviteUser extends Component {
	constructor(props) {
		super()

		this.state = {
			email: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange (event) {
		this.setState({ email: event.target.value })
	}

	handleSubmit (event) {
		event.preventDefault()

		inviteUser(this.state.email, this.props.tripId)
	}

	render () {
		return (
			<div>
				<Form horizontal onSubmit={this.handleSubmit}>
					<FormGroup controlId="formName">
						<Col componentClass={ControlLabel} smOffset={2} sm={2}>
							Enter the e-mail address of the person you want to invite
						</Col>
						<Col sm={4}>
							<FormControl
								type="email"
								name="email"
								placeholder="friend@flashback.biz"
								onChange={this.handleChange}
							/>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={4} sm={10}>
							<Button type="submit" value="Submit">
								Invite
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</div>
		)
	}
}
