import React, { Component } from 'react'
import update from 'react/lib/update'
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, ListGroup, ListGroupItem } from 'react-bootstrap'
import { inviteUser, listUsers } from 'APP/app/components/utils/inviteUser'
import { database } from 'APP/db/firebase'

export default class InviteUser extends Component {
	constructor(props) {
		super()

		this.state = {
			email: '',
			showInvalidAlert: false,
			showSuccessAlert: false,
      collaboratorNames: [],
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInvalidEmail = this.handleInvalidEmail.bind(this)
		this.handleSuccess = this.handleSuccess.bind(this)
    // this.listCollaborators = this.listCollaborators.bind(this)
	}

  componentWillMount () {
    database
      .ref(`tripUsers/${this.props.tripId}`)
      .once('value')
      .then(users => {
        for (let id in users.val()) {
          listUsers(id)
            .then(name => {
              this.state.collaboratorNames.push(name)
              this.forceUpdate()
            })
            .catch(console.error)
        }
      })

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
    const collaborators = this.state.collaboratorNames
		return (
			<div>
				<h4>Invite To Edit</h4>
        <Col sm={12}>
          <strong>Current collaborators:</strong>
          <ListGroup>
            {collaborators ? collaborators.map(name => {
              return (
                <ListGroupItem key={name}>
                  {name}
                </ListGroupItem>
              )
            }) : <p>Invite some friends !</p>}
          </ListGroup>
        </Col>
				<Form horizontal onSubmit={this.handleSubmit}>
					<FormGroup controlId="email">
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
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
						<Col smOffset={2} sm={10}>
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
