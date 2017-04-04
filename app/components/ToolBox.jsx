//LIBRARIES
import React, { Component } from 'react'
import { Button, Accordion, Panel, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { auth, database } from 'APP/db/firebase'
import { DefaultPlayer as Video} from 'react-html5video'
//COMPONENTS
import InviteUser from './ToolBoxComponents/InviteUser'
import EditTextElement from './ToolBoxComponents/EditTextElement'
import EditPhotoOrVideoElement from './ToolBoxComponents/EditPhotoOrVideoElement'
//REDUCER
import { createTextBox, addAPhoto, setSize, addAVideo, setElementZIndex } from '../reducers/elements'

class ToolBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: null,
      photos: null,
      videos: null,
      title: this.props.tripInfo.name,
      description: this.props.tripInfo.description,
      startDate: this.props.tripInfo.startDate,
    }

    this.addNewTextBox = this.addNewTextBox.bind(this)
    this.makeRandomId = this.makeRandomId.bind(this)
    this.addPhoto = this.addPhoto.bind(this)
    this.handleTripInfoSubmit = this.handleTripInfoSubmit.bind(this)
    this.handleTripInfoInput = this.handleTripInfoInput.bind(this)
    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.addVideo = this.addVideo.bind(this)
    this.handleDepth = this.handleDepth.bind(this)
  }

  makeRandomId () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  handleDepth (event) {
    //first we are checking if the selected item has a zIndex and
    //if not set it to one
    if (!this.props.selected.zIndex) this.props.selected.zIndex = 1
    //Here we either add or reduce the zIndex
    const newZIndex = event.target.value === "plus" ? ++this.props.selected.zIndex : --this.props.selected.zIndex

    let elementToUpdate = {
      id: this.props.selected.id,
      type: this.props.selected.type,
      zIndex: newZIndex,
    }

    //send this updated element into the reducer to update the state
    this.props.setElementZIndex(elementToUpdate)
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

  addVideo (event) {
    let newVideo = {
      [this.makeRandomId()]: {
        source: event.target.getAttribute('id'),
        top: 300,
        left: 300,
        size: 'medium',
      }
    }

    this.props.addAVideo(newVideo)
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
        const dbUserVideoRef = database.ref(`videos/${userId}`)
        dbUserVideoRef.on('value', (snapshot) => this.setState({
          videos: snapshot.val(),
        }))
      }
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const photoKeys = this.state.photos && Object.keys(this.state.photos)
    const videoKeys = this.state.videos && Object.keys(this.state.videos)
    let tripInfo = this.props.tripInfo || ""
    let selectedElement;
    if (this.props.selected) {
      selectedElement = this.props.elements[this.props.selected.type][this.props.selected.id]
    }
    const path = `voyagr.co/canvas/${this.props.tripId}/${this.props.pageId}`
    return (
      <div id="toolbox-container">
        <Accordion id="toolbox">
          <Panel header="Add Text Box" eventKey="1" onClick={this.addNewTextBox} />
          <Panel header="Add Photo" eventKey="2">
            {this.state.photos ?
              //if the user has photos we will map over them
              //and display them all
              <div id="photo-panel">
                {photoKeys ? photoKeys.map(photoKey => {
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
              <br />
                Head over to your <a href="/suitcase">suitcase</a> to upload some pictures!
              </div>
          }

          </Panel>
          <Panel header="Add a Video" eventKey="3">
            {this.state.videos ?
              <div>
                {videoKeys ? videoKeys.map(videoKey => {
                    return (
                      <div key={videoKey}>
                        <Video loop muted
                          controls={['PlayPause']}>
                          <source src={this.state.videos[videoKey]} type="video/webm" />
                        </Video>
                        <Button id={this.state.videos[videoKey]} onClick={this.addVideo}>+</Button>
                      </div>
                    )
                  }) : null }
              </div>
              :
              <div>You have no videos yet! <br/> Head over to your <a href="/suitcase">suitcase</a> to upload some. </div>
            }
          </Panel>
          <Panel header="Edit Trip Information" eventKey="4">
            <strong>Edit your trip information</strong>
            <Form horizontal onSubmit={this.handleTripInfoSubmit}>
                <FormGroup controlId="Title">
                  <Col componentClass={ControlLabel} sm={3}>
                    Title
                  </Col>
                  <Col sm={9}>
                    <FormControl onChange={this.handleTripInfoInput} name="title" defaultValue={tripInfo.name}  />
                  </Col>
                </FormGroup>

                <FormGroup controlId="description">
                  <Col componentClass={ControlLabel} sm={3}>
                    Description
                  </Col>
                  <Col sm={9}>
                    <FormControl name="description" onChange={this.handleTripInfoInput} defaultValue={tripInfo.description} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="startDate">
                  <Col componentClass={ControlLabel} sm={3}>
                    Start Date
                  </Col>
                  <Col sm={9}>
                    <FormControl name="startDate" onChange={this.handleTripInfoInput} defaultValue={tripInfo.startDate} />
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
          <Panel header="Edit Element" eventKey="5">
            { this.props.selected ?
              //if there is a selected item
              <div>
                {
                  //we will render out different components
                  //based off what different element is selected
                  this.props.selected.type === "textBox" ?
                  <EditTextElement elementId={this.props.selected.id}handleSizeChange={this.handleSizeChange} selectedElement={selectedElement}/>
                  : <EditPhotoOrVideoElement handleSizeChange={this.handleSizeChange} selectedElement={selectedElement}/>
                }
                <hr/>
                <strong>Depth</strong>
                <br/>
                <Button onClick={this.handleDepth} value="minus">-</Button>
                <Button onClick={this.handleDepth} value="plus">+</Button>
              </div>
              //if there is no selected element
              : <strong>Please pick an item to edit</strong>
            }
          </Panel>
          <Panel header="Invite your friends!" eventKey="6">
            <h3>To View</h3>
              Share This Link: {path}
            <InviteUser tripId={this.props.tripId} pageId={this.props.pageId} />
          </Panel>
        </Accordion>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { createTextBox, addAPhoto, setSize, addAVideo, setElementZIndex })(ToolBox)
