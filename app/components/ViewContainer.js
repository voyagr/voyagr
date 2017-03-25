import React, { Component } from 'react'
import { connect } from 'react-redux'
import ViewCanvas from './ViewCanvas'
import { Provider } from 'react-redux'
import {ref} from 'APP/db/firebase'
import store from 'APP/app/store'
import ToolBox from './ToolBox'
import { Grid, Col, Button } from 'react-bootstrap'

export default class CanvasContainer extends Component {
  constructor (props) {
    super(props)
  }

  //when this component mounts, figure out the firebase path from params
  componentDidMount () {
    this.setState({
      store: store(ref.child(this.props.params.tripId))
    })
  }

  //add component will receive props, update store

  //possibly add cleanup for component will unmount

  render () {
    if (!this.state) return null
      console.log('Trip Id', this.props.params.tripId)
    return (
      <Provider store={this.state.store}>
        <div>
          <Button href={`/canvas/${this.props.params.tripId}`}>Edit Page</Button>
          <div className="center-grid">
            <ViewCanvas />
          </div>
        </div>
      </Provider>
    )
  }
}
