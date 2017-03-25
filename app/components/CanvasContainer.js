import React, { Component } from 'react'
import Canvas from './Canvas'
import { Provider } from 'react-redux'
import { database } from 'APP/db/firebase'
import store from 'APP/app/store'
import ToolBox from './ToolBox'
import { Grid, Col } from 'react-bootstrap'

export default class CanvasContainer extends Component {
  constructor (props) {
    super(props)

    this.storeWillSet = this.storeWillSet.bind(this)
  }

//promisifed setting the store and the tripinfoRef
  storeWillSet (tripId, tripActionsRef) {
    return new Promise((resolve, reject) => {
        this.setState({
          store: store(tripActionsRef),
          tripInfoRef: database.ref(`tripInfo/${tripId}`)
      })
    })
  }

  //when this component mounts, figure out the firebase path from params
  componentDidMount () {
    const tripId = this.props.params.tripId
    const tripActionsRef = database.ref(`tripActions/${tripId}`)

    //We have to set the store in a promise so that we can
    //.then off of it to make sure we wait till it's done to
    //get the tripInfo so that we can pass it down to the
    //toolbox
    this.storeWillSet(tripId, tripActionsRef)
    .then(() =>
      this.state.tripInfoRef.on('value', (snap) => this.setState({
        tripInfo: snap.val()
      }))
    )
    .catch(err => console.error(err))
  }

  //add component will receive props, update store

  //possibly add cleanup for component will unmount

  render () {
    if (!this.state) return null
    let tripInfo = this.state.tripInfo || null
    return (
      <Provider store={this.state.store}>
        <Grid>
          {
            tripInfo ?
            <div>
              <h1>{`${tripInfo.name}, ${tripInfo.description}, ${tripInfo.startDate}`}</h1>
            </div>
            : null
          }
          <Col lg={4}>
            <ToolBox tripInfo={tripInfo} tripInfoRef={this.state.tripInfoRef}/>
          </Col>
          <Col lg={8}>
            <Canvas />
          </Col>
        </Grid>
      </Provider>
    )
  }
}
