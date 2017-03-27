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
    this.selectElement = this.selectElement.bind(this)
  }

  //when this component mounts, figure out the firebase path from params
  componentDidMount () {
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
  }

  selectElement (event) {
    // console.log("INSIDE SELECT", event.target)

  }


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
            <Canvas selectElement={this.selectElement} />
          </Col>
        </Grid>
      </Provider>
    )
  }
}
