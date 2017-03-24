import React, { Component } from 'react'
import { ButtonToolbar, Button, Accordion, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'

import { createTextBox } from '../reducers/elements'

import { auth, database } from 'APP/db/firebase'

class ToolBox extends Component {
	constructor(props) {
		super(props)

		this.state = {
			address: null,
			photos: null,
		}

		this.onClickListener = this.onClickListener.bind(this)
		this.makeRandomId = this.makeRandomId.bind(this)
	}

  makeRandomId () {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);

	}

	onClickListener (event) {
		event.preventDefault()
		let newTextBox = {
			[this.makeRandomId()]: {
				top: 100,
				left: 100,
				size: 'small',
				text: 'i went on a trip',
			}
		}

		this.props.createTextBox(newTextBox)
	}

	componentDidMount () {
		auth.onAuthStateChanged((user) => {
			if (user) {
				const userId = user.uid
				const dbUserPhotosRef = database.ref(`photos/${userId}`)
				dbUserPhotosRef.on('value', (snapshot) => this.setState({
					photos: snapshot.val(),
				}))
			}
		})
	}

	render () {
		const keys = this.state.photos && Object.keys(this.state.photos)
		return (
			<div>
				<ButtonToolbar>
					<Button bsStyle="primary" bsSize="large" onClick={this.onClickListener}>Add text box</Button>
				</ButtonToolbar>
				<Accordion>
					<Panel header="Add Photo" eventKey="1">
						This is the photo drawer!
						<div id="photo-panel">
						{keys ? keys.map(photoKey => {
							return (
							  <div className="drawer-photo" key={photoKey}>
								  <img src={this.state.photos[photoKey]} />
							  </div>)
						}) : null}
						</div>
					</Panel>
				</Accordion>
			</div>
		)
	}
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { createTextBox })(ToolBox)
