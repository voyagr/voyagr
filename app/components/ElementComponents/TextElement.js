import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import shouldPureComponentUpdate from '../utils/shouldPureComponentUpdate'
import { editText } from '../../reducers/elements'

  function getStyles (props, isDisabled) {
    let border = isDisabled ? "none" : '1px dashed gray'

    return {
      border: border,
      padding: '30px',
      cursor: 'move',
      background: props.background,
      fontSize: props.size,
      color: props.color,
    };
  }

class TextElement extends Component {

  shouldComponentUpdate = shouldPureComponentUpdate;

  handleChange (event) {
    let updatedTextBox = {
      [this.props.id]: {
        text: event.target.value
      }
    }

    this.props.editText(updatedTextBox)
  }

  render() {
    const { text, size } = this.props;
    let isDisabled
    if (this.props.editable === false) isDisabled = true
    else isDisabled = false
    return (
      <div style={getStyles(this.props, isDisabled)}>
        <ContentEditable
          html={text}
          disabled={isDisabled}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { editText })(TextElement)
