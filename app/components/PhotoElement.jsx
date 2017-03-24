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
    return (
      <img src={this.props.source} />
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(Element)
