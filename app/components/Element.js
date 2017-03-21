import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from './shouldPureComponentUpdate'
import ContentEditable from 'react-contenteditable'
import { editText } from '../reducers/elements'

const styles = {
  border: '1px dashed gray',
  padding: '20px',
  cursor: 'move',
};

class Element extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  handleChange (event) {
    let updatedTextBox = {
      [this.props.id]: {
        text: event.target.value
      }
    }
    console.log(updatedTextBox)

    this.props.editText(updatedTextBox)
  }

  render() {
    const { text, yellow } = this.props;

    return (
      <ContentEditable
        html={text}
        disabled={false}
        onChange={this.handleChange.bind(this)}
        style={{ ...styles }}
      />
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { editText })(Element)

      // {/*<div style={{ ...styles, backgroundColor }} contentEditable="true">
      //   {text}
      // </div>*/}
