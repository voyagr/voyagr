import React, { Component } from 'react'
import { ButtonToolbar, Button, Accordion, Panel, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { auth, database } from 'APP/db/firebase'
import { createTextBox, addAPhoto, setSize } from '../reducers/elements'
import InviteUser from './InviteUser'
import EditTextElement from './EditTextElement'
import EditPhotoElement from './EditPhotoElement'

class ToolBox extends Component {
	constructor(props) {
		super(props)

		this.state = {
			address: null,
			photos: null,
			title: '',
			description: '',
			startDate: '',
		}

		this.addNewTextBox = this.addNewTextBox.bind(this)
		this.makeRandomId = this.makeRandomId.bind(this)
		this.addPhoto = this.addPhoto.bind(this)
		this.handleTripInfoSubmit = this.handleTripInfoSubmit.bind(this)
		this.handleTripInfoInput = this.handleTripInfoInput.bind(this)
		this.handleSizeChange = this.handleSizeChange.bind(this)
	}

  makeRandomId () {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	handleTripInfoSubmit (event) {
		event.preventDefault()

		const infoToUpdate = {
			name: this.state.title,
			description: this.state.description,
			startDate: this.state.startDate
		}

		this.props.tripInfoRef.set(infoToUpdate)
	}

	handleTripInfoInput (event) {
		const value = event.target.value
		const type = event.target.name

		this.setState({[type]: value})
	}

	handleSizeChange (event) {
		let elementToUpdateSize = {
			size: event.target.value,
			id: this.props.selected.id,
			type: this.props.selected.type,
		}


    this.props.setSize(elementToUpdateSize)
	}

	addNewTextBox (event) {
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

	addPhoto (event) {
		let newPhoto = {
			[this.makeRandomId()]: {
				source: event.target.getAttribute("id"),
				top: 200,
				left: 200,
				size: 'small',
			}
		}
		this.props.addAPhoto(newPhoto)
	}

	componentDidMount () {
		this.unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const userId = user.uid
				const dbUserPhotosRef = database.ref(`photos/${userId}`)
				dbUserPhotosRef.on('value', (snapshot) => this.setState({
					photos: snapshot.val(),
				}))
			}
		})
	}

	componentWillUnmount () {
    this.unsubscribe()
  }

	render () {
		const keys = this.state.photos && Object.keys(this.state.photos)
		let tripInfo = this.props.tripInfo || ""
		let selectedElement;
		if (this.props.selected) selectedElement = this.props.elements[this.props.selected.type][this.props.selected.id]

		return (
			<div>

				<ButtonToolbar>
					<Button bsStyle="primary" bsSize="large" onClick={this.addNewTextBox}>Add text box</Button>
				</ButtonToolbar>

				<Accordion id="toolbox">
					<Panel header="Add Photo" eventKey="1">
						{this.state.photos ?
							//if the user has photos we will map over them
							//and display them all
							<div id="photo-panel">
								{keys ? keys.map(photoKey => {
									return (
									  <div className="drawer-photo" key={photoKey}>
										  <img src={this.state.photos[photoKey]} />
										  <Button id={this.state.photos[photoKey]} onClick={this.addPhoto}>+</Button>
									  </div>)
								}) : null}
							</div>
						:
						//if the user has no uploaded photos this will display
							<div>
								You don't have any photos yet!
							<br/>
								Head over to your suitcase to upload some pictures!
							</div>
					}

					</Panel>

					<Panel header="Edit Trip Information" eventKey="2">
						<strong>Edit your trip information</strong>
						<Form horizontal onSubmit={this.handleTripInfoSubmit}>
						    <FormGroup controlId="Title">
						      <Col componentClass={ControlLabel} sm={3}>
						        Title
						      </Col>
						      <Col sm={9}>
						        <FormControl onChange={this.handleTripInfoInput} name="title" placeholder={tripInfo.name} />
						      </Col>
						    </FormGroup>

						    <FormGroup controlId="description">
						      <Col componentClass={ControlLabel} sm={3}>
						        Description
						      </Col>
						      <Col sm={9}>
						        <FormControl name="description" onChange={this.handleTripInfoInput} placeholder={tripInfo.description} />
						      </Col>
						    </FormGroup>

						    <FormGroup controlId="startDate">
						      <Col componentClass={ControlLabel} sm={3}>
						        Start Date
						      </Col>
						      <Col sm={9}>
						        <FormControl name="startDate" onChange={this.handleTripInfoInput} placeholder={tripInfo.startDate} />
						      </Col>
						    </FormGroup>

						    <FormGroup>
						      <Col smOffset={3} sm={10}>
						        <Button type="submit">
						          Submit
						        </Button>
						      </Col>
						    </FormGroup>
						  </Form>
					</Panel>
					<Panel header="Edit Element" eventKey="3">
						{ this.props.selected ?
							//if there is a selected item
							<div>
								{
									//we will render out different components
									//based off what different element is selected
									this.props.selected.type === "photo" ?
									<EditPhotoElement handleSizeChange={this.handleSizeChange} selectedElement={selectedElement}/>
									: <EditTextElement elementId={this.props.selected.id}handleSizeChange={this.handleSizeChange} selectedElement={selectedElement}/>

								}
							</div>
							//if there is no selected element
							: <strong>Please pick an item to edit</strong>
						}
					</Panel>
					<Panel header="Invite your friends to collaborate!" eventKey="4">
						<InviteUser tripId={this.props.tripId} />
					</Panel>
				</Accordion>
			</div>
		)
	}
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { createTextBox, addAPhoto, setSize })(ToolBox)
