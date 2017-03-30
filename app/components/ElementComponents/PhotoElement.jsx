import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from '../utils/shouldPureComponentUpdate'

class PhotoElement extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <img
        className={`element-size-${this.props.size}`}
        src={this.props.source}
        value={this.props.id}
        type={this.props.type} />
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(PhotoElement)
