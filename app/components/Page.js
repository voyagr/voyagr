import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { DropTarget, DragSource } from 'react-dnd';
import shouldPureComponentUpdate from './utils/shouldPureComponentUpdate';
import ItemTypes from './utils/ItemTypes';
import DraggableElement from './DraggableElement';
import NonDraggableElement from './NonDraggableElement';
import snapToGrid from './utils/snapToGrid';
import { connect } from 'react-redux';
import { setElementXY, deleteElement, setSize } from '../reducers/elements'

function getStyles (props) {
  let border = props.editable ? '1px solid #607D8B' : "none"

  return {
    width: '795',
    height: 500,
    border: border,
    position: 'relative',
  }
}

const elementTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset()
    const item = monitor.getItem()

    let left = Math.round(item.left + delta.x)
    let top = Math.round(item.top + delta.y)
    if (props.snapToGrid) {
      [left, top] = snapToGrid(left, top)
    }
    component.moveElement(item.type, item.id, left, top, item.zIndex)
  },

};

class Page extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    snapToGrid: PropTypes.bool.isRequired,
  }
  constructor (props) {
    super(props)

    this.elementClick = this.elementClick.bind(this)
  }

  shouldComponentUpdate = shouldPureComponentUpdate;


  moveElement(type, id, left, top, zIndex) {
    //we have to leave this here just for the video
    //elements because they wont get into the element
    //click because of the click to play mode
    if(this.props.deleteMode) {
      let elementToDelete = {
        type: type,
        id: id,
      }

      this.props.clearSelectedIfDeleted(type, id)
      this.props.deleteElement(elementToDelete)
    } else {
      this.props.selectElement(type, id, zIndex)

      let elementUpdate = {
        type: type,
        id: id,
        left: left,
        top: top,
      }

      this.props.setElementXY(elementUpdate)
    }
  }

  //this gets called when we click on anything in the
  //page box
  elementClick (event) {
    //we pull off the value and the type off of each element
    const id = event.target.getAttribute("value")
    const type = event.target.getAttribute("type")
    //if either of the values are false that means the user
    //clicked on something other than an element
    if (!id || !type) return
    let clickedElement = this.props.elements[type][id]

    if(this.props.deleteMode) {
      let elementToDelete = {
        type: type,
        id: id,
      }

      this.props.clearSelectedIfDeleted(type, id)
      this.props.deleteElement(elementToDelete)
    } else {
      this.props.selectElement(type, id, clickedElement.zIndex)

    }

  }

  renderElement(item, key, type) {
    if (this.props.editable) return <DraggableElement  key={key} onClick={this.elementClick} id={key} type={type} {...item} />
    else return <NonDraggableElement key={key} id={key} type={type} {...item} />
  }

  render() {
    const { connectDropTarget } = this.props
    const { elements } = this.props

    return connectDropTarget(
      <div onClick={this.elementClick} style={getStyles(this.props)}>
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
Page = DropTarget(ItemTypes.ELEMENT, elementTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  plzGetItem: monitor.getItem(),
}))(Page)

Page = connect(mapStateToProps, { setElementXY, deleteElement, setSize })(Page)

export default Page
