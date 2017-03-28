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

    this.setState({
      store: store(tripActionsRef),
      tripInfoRef: database.ref(`tripInfo/${tripId}`)
    }, () => {
      this.state.tripInfoRef.on('value', (snap) => this.setState({
          tripInfo: snap.val()
        }))
    })

    this.unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('USER in will mount', user.uid)
        // this.setState({user: user.uid})
        this.setState({userId: user.uid})
      }
    })
  }

  componentWillReceiveProps () {

  }

  componentWillUnmount () {
    //add cleanup from auth.userChange listener
    this.unsubscribe()
  }

  //add component will receive props, update store

  //possibly add cleanup for component will unmount

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
    return this.user ?
                      (<Button onClick={this.toggleMode}>
                        {this.state.editable ? "View" : "Edit" }
                      </Button>)
                     : null
  }

  render () {
    console.log("editable", this.state.editable)
    console.log("user", this.state.userId)
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
