import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from './utils/shouldPureComponentUpdate';
import Element from './Element';
import PhotoElement from './PhotoElement'

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
};

export default class ElementDragPreview extends Component {
  static propTypes = {
    // text: PropTypes.string.isRequired,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      tickTock: false,
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({
      tickTock: !this.state.tickTock,
    });
  }

  render() {
    const { text } = this.props;
    const { tickTock } = this.state;
    return (
      <div style={styles}>
        { this.props.type === "photo" ?
        <PhotoElement id={this.props.id} source={this.props.source}/>
        :
        <Element text={text} yellow={tickTock} />
        }
      </div>
    );
  }
}
