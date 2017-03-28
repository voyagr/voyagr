//make a function that checks if user
//then if that user belongs to this trip or vice versa
//if both are true then render edit/view button, and tool bar, otherwise don't
//set permissions to anyone can see but only owners can edit

import React, { Component } from 'react'
import Canvas from './Canvas'
import { Provider } from 'react-redux'
import { database, auth } from 'APP/db/firebase'
import store from 'APP/app/store'
import ToolBox from './ToolBox'
import { Grid, Col, Button } from 'react-bootstrap'

export default class CanvasContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: null,
      store: null,
      editable: false,
      userId: null,
      canEdit: false,
    }

    this.selectElement = this.selectElement.bind(this)
    this.toggleMode = this.toggleMode.bind(this)
    this.renderView = this.renderView.bind(this)
    this.renderEditButton = this.renderEditButton.bind(this)
  }

  toggleMode() {
    this.setState({
      editable: !this.state.editable,
    })
  }

  //this function is called from inside page when we move an element
  selectElement (type, id) {
    this.setState({
      selected: {id: id, type: type}
    })
  }

  //when this component mounts, figure out the firebase path from params
  componentWillMount () {
    const tripId = this.props.params.tripId
    const tripActionsRef = database.ref(`tripActions/${tripId}`)
    const tripUsersRef = database.ref(`tripUsers/${tripId}`)

    //replays the actions from the Firebase db to get to 'current state'
    this.setState({
      store: store(tripActionsRef),
      tripInfoRef: database.ref(`tripInfo/${tripId}`)
    }, () => {
      this.state.tripInfoRef.on('value', (snap) => this.setState({
          tripInfo: snap.val()
        }))
    })

    //sets a current user listener from Firebase auth
    this.unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //set user id on state for rendring the edit/view button
        this.setState({
          userId: user.uid,
        })
        //get the object of users that belong to this trip from Firebase db
        tripUsersRef.on('value', (snap) => {
          let tripUsers = snap.val()
          //get an array of values from the tripUsers object
          let isCollaborator = Object.values(tripUsers).includes(user.uid)
          //if current user is in the array, then they can edit, else they can't
          this.setState({
            editable: isCollaborator,
            canEdit: isCollaborator,
          })
        })
      } else { //if there is no user or then they can't edit
        this.setState({
          userId: null,
          editable: false,
          canEdit: false,
        })
      }
    })
  }

  componentWillUnmount () {
    //add cleanup from auth.userChange listener
    this.unsubscribe()
  }

  renderView() {
    return this.state.editable ?
    //render this if editable is true
        <Col lg={2}>
          <ToolBox
            tripInfo={this.state.tripInfo}
            tripInfoRef={this.state.tripInfoRef}
            selected={this.state.selected}
            tripId={this.props.params.tripId}
          />
        </Col>

    //render this if editable is false
    : null
  }

  renderEditButton() {
    return this.state.canEdit ?
                      (<Button onClick={this.toggleMode}>
                        {this.state.editable ? "View" : "Edit" }
                      </Button>)
                     : null
  }

  render () {
    if (!this.state) return null
    let tripInfo = this.state.tripInfo || null
    return (
      <div>
        {this.renderEditButton()}
        {
          tripInfo ?
          <div>
            <h1>{`${tripInfo.name}, ${tripInfo.description}, ${tripInfo.startDate}`}</h1>
          </div>
          : null
        }
        <Provider store={this.state.store}>
          <Grid id="canvas-wrapper">
            {this.renderView()}
            <Col lg={10}>
              <Canvas editable={this.state.editable} selectElement={this.selectElement}/>
            </Col>
          </Grid>
        </Provider>
      </div>
    )
  }
}
