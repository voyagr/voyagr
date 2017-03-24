import React, { Component } from 'react'
import { connect } from 'react-redux'
import Canvas from './Canvas'
import { Provider } from 'react-redux'
import {ref} from 'APP/db/firebase'
import store from 'APP/app/store'
import ToolBox from './ToolBox'
import { Grid, Col } from 'react-bootstrap'

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
    return (
      <Provider store={this.state.store}>
        <Grid>
          <Col lg={4}>
            <ToolBox />
          </Col>
          <Col lg={8}>
            <Canvas />
          </Col>
        </Grid>
      </Provider>
    )
  }
}
