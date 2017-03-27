import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from './utils/shouldPureComponentUpdate'

const styles = {
  border: '1px dashed gray',
  padding: '20px',
  cursor: 'move',
};

class Element extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    console.log(this.props.size)
    return (
      <img id={`image-size-${this.props.size}`} src={this.props.source} />
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(Element)
