import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import { editText } from '../reducers/elements'

const styles = {
  border: '1px dashed gray',
  padding: '20px',
  cursor: 'move',
  background: 'white',
};

class Element extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  handleChange (event) {
    let updatedTextBox = {
      [this.props.id]: {
        text: event.target.value
      }
    }

    this.props.editText(updatedTextBox)
  }

  render() {
    const { text } = this.props;
    let isDisabled
    if (this.props.editable === false) isDisabled = true
    else isDisabled = false
    return (
      <ContentEditable
        html={text}
        disabled={isDisabled}
        onChange={this.handleChange.bind(this)}
        style={{ ...styles }} />
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { editText })(Element)
