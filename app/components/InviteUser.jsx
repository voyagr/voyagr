import React, { Component } from 'react'
import { Button, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap'
import { database } from 'APP/db/firebase'

export default class InviteUser extends Component {
	constructor(props) {
		super()

		/*
		props = tripId
		*/

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

		database
		.ref('tripUsers/tripId/')
		.set({ [this.state.email]: this.state.email })
	}

	render () {
		return (
			<div>
				<Form horizontal onSubmit={this.handleSubmit}>
					<FormGroup controlId="formName">
						<Col componentClass={ControlLabel} smOffset={2} sm={2}>
							Email
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
