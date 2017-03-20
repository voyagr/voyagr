import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import ItemTypes from './ItemTypes';
import DraggableElement from './DraggableElement';
import snapToGrid from './snapToGrid';

const styles = {
  width: '100%',
  height: 500,
  border: '1px solid black',
  position: 'relative',
};

const elementTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset();
    const item = monitor.getItem();

    let left = Math.round(item.left + delta.x);
    let top = Math.round(item.top + delta.y);
    if (props.snapToGrid) {
      [left, top] = snapToGrid(left, top);
    }

    component.moveElement(item.id, left, top);
  },
};


class Page extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    snapToGrid: PropTypes.bool.isRequired,
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);


    this.state = {
      elements: {
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' },
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  moveElement(id, left, top) {
    this.setState(update(this.state, {
      elements: {
        [id]: {
          $merge: { left, top },
        },
      },
    }));
  }

  renderElement(item, key) {
    return (
      <DraggableElement key={key} id={key} {...item} />
    );
  }

  handleSubmit () {
    console.log("INSIDE HANDLE SUBMIT");
    console.log("STATE=", this.state);
  }

  render() {
    const { connectDropTarget } = this.props;
    const { elements } = this.state;

    console.log(this.state)

    return connectDropTarget(
      <div style={styles}>
        {Object
          .keys(elements)
          .map(key => this.renderElement(elements[key], key))
        }
        <button type="submit" onClick={this.handleSubmit}>Save</button>
      </div>,
    );
  }
}

export default DropTarget(ItemTypes.ELEMENT, elementTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Page)
