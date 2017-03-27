import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import shouldPureComponentUpdate from './utils/shouldPureComponentUpdate';
import ItemTypes from './utils/ItemTypes';
import DraggableElement from './DraggableElement';
import snapToGrid from './utils/snapToGrid';
import { connect } from 'react-redux';
import { setElementXY, deleteElement, setSize } from '../reducers/elements'

const styles = {
  width: '100%',
  height: 500,
  border: '1px solid black',
  position: 'relative',
};

const elementTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset()
    const item = monitor.getItem()

    let left = Math.round(item.left + delta.x)
    let top = Math.round(item.top + delta.y)
    if (props.snapToGrid) {
      [left, top] = snapToGrid(left, top)
    }

    component.moveElement(item.type, item.id, left, top)
  },
};


class Page extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    snapToGrid: PropTypes.bool.isRequired,
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props)
  }

  moveElement(type, id, left, top) {

    this.props.selectElement(type, id)
    // let elementToUpdateSize = {
    //   type: type,
    //   id: id,
    //   size: "large"
    // }

    // this.props.setSize(elementToUpdateSize)

    if(this.props.deleteMode) {
      let elementToDelete = {
        type: type,
        id: id,
      }

      this.props.deleteElement(elementToDelete)
    } else {

      let elementUpdate = {
        type: type,
        id: id,
        left: left,
        top: top,
      }

      this.props.setElementXY(elementUpdate)
    }
  }

  renderElement(item, key, type) {
    return (
      <DraggableElement key={key} id={key} type={type} {...item} />
    );
  }

  render() {
    const { connectDropTarget } = this.props
    const { elements } = this.props


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
      </div>,
    );
  }
}

const mapStateToProps = state => state

// wraps Page component with DropTarget capabilities from react-dnd,
// similar to the redux connect function
Page = DropTarget(ItemTypes.ELEMENT, elementTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Page)

Page = connect(mapStateToProps, { setElementXY, deleteElement, setSize })(Page)

export default Page
