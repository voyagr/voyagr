import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import shouldPureComponentUpdate from './utils/shouldPureComponentUpdate'
import { editText } from '../reducers/elements'

  function getStyles (props) {
    console.log('inside getstyles', props)

    return {
      border: '1px dashed gray',
      padding: '30px',
      cursor: 'move',
      background: 'white',
      fontSize: props.size,
    };
  }

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

    this.props.editText(updatedTextBox)
  }

  // shouldComponentUpdate() {
  //   console.log("INSIDE UPDATE")
  //   return false
  // }

  render() {
    const { text, size } = this.props;
    console.log("PROP SIZE", this.props.size)
    return (
      <div style={getStyles(this.props)}>
      <ContentEditable
        html={text}
        disabled={false}
        onChange={this.handleChange.bind(this)}

      />
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { editText })(Element)
