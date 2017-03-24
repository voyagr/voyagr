import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from './utils/shouldPureComponentUpdate'
import ContentEditable from 'react-contenteditable'
import { editText } from '../reducers/elements'

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

export default connect(mapStateToProps, { editText })(Element)
