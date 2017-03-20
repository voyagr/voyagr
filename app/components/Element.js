import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';

const styles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
};

export default class Element extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    yellow: PropTypes.bool,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { text, yellow } = this.props;
    const backgroundColor = yellow ? 'yellow' : 'white';

    return (
      <div style={{ ...styles, backgroundColor }}>
        {text}
      </div>
    );
  }
}
