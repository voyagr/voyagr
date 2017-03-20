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

    component.moveElement(item.type, item.id, left, top);
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
        textBox: { 1: { top: 20, left: 80, size: 'small', text: 'My vacay memories' }, 2: { top: 100, left: 120, size: 'small', text: 'note to self'} },
        photo: {1: {top: 200, left: 20, size: 'small', text: 'Pretty Photo' }}
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  moveElement(type, id, left, top) {
    this.setState(update(this.state, {
      elements: {
        [type] : {
          [id]: {
            $merge: { left, top },
          }
        },
      },
    }));
  }

  renderElement(item, key, type) {
    return (
      <DraggableElement key={key} id={key} type={type} {...item} />
    );
  }

  handleSubmit () {
    console.log("STATE=", this.state);
  }

  render() {
    const { connectDropTarget } = this.props;
    const { elements } = this.state;

    return connectDropTarget(
      <div style={styles}>
        {Object
          .keys(elements)
          .map(type => {
            return Object.keys(elements[type])
            .map((elementId) => {
              var currentEl = elements[type][elementId];
              return this.renderElement(currentEl, elementId, type)
            })
          })
        }
        <button type="submit" onClick={this.handleSubmit}>Save</button>
      </div>,
    );
  }
}

export default DropTarget(ItemTypes.ELEMENT, elementTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Page)
