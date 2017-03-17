import React, { Component } from 'react'
import { connect } from 'react-redux'

class PageRender extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    console.log("STATE", this.state)
    console.log("PROPS", this.props)
    return (
      <div>
        <h1>HIZZZ</h1>
      </div>
    )
  }
}

export default connect (
  state => ({page: state.page}),
  (dispatch) => ({})
)(PageRender)
