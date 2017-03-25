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
  }
  // export const ref = database.ref()
  //tripRef = database.ref()
//  const userId = user.uid
//  const dbUserPhotosRef = database.ref(`photos/${userId}`)
//  dbUserPhotosRef.on('value', (snapshot) => this.setState({
//    photos: snapshot.val(),
//  }))


  //when this component mounts, figure out the firebase path from params
  componentDidMount () {
    const tripId = this.props.params.tripId
    const tripActionsRef = database.ref(`tripActions/${tripId}`)
    // const tripInfoRef = database.ref(`tripInfo/${tripId}`)

    this.setState({
      store: store(tripActionsRef),
      tripInfoRef: database.ref(`tripInfo/${tripId}`)
    }, () => { this.state.tripInfoRef.on('value', (snap) => this.setState({
      tripInfo: snap.val()
    })) })
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
            <ToolBox tripInfo={this.state.tripInfo} tripInfoRef={this.state.tripInfoRef}/>
          </Col>
          <Col lg={8}>
            <Canvas />
          </Col>
        </Grid>
      </Provider>
    )
  }
}
