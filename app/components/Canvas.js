import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Page from './Page';
import CustomDragLayer from './CustomDragLayer';
import ToolBox from './ToolBox'

class Canvas extends Component {
  constructor(props) {
    super(props)

    this.handleSnapToGridAfterDropChange = this.handleSnapToGridAfterDropChange.bind(this)
    this.handleSnapToGridWhileDraggingChange = this.handleSnapToGridWhileDraggingChange.bind(this)
    this.handleDeleteMode = this.handleDeleteMode.bind(this)
    // this.renderCustomDragLayer = this.renderCustomDragLayer.bind(this)

    this.state = {
      snapToGridAfterDrop: false,
      snapToGridWhileDragging: false,
      deleteMode: false,
    };
  }

  handleSnapToGridAfterDropChange() {
    this.setState({
      snapToGridAfterDrop: !this.state.snapToGridAfterDrop,
    });
  }

  handleSnapToGridWhileDraggingChange() {
    this.setState({
      snapToGridWhileDragging: !this.state.snapToGridWhileDragging,
    });
  }

  handleDeleteMode () {
    this.setState({
      deleteMode: !this.state.deleteMode,
    })
  }

//keeps drag preview from being rendered, but not the drag itself
  // renderCustomDragLayer () {
  //   return (
  //     <CustomDragLayer snapToGrid={this.state.snapToGridWhileDragging} />
  //   )
  // }

  render() {
    const { snapToGridAfterDrop, snapToGridWhileDragging, deleteMode } = this.state;

    return (
      <div>
        <Page snapToGrid={snapToGridAfterDrop} deleteMode={deleteMode} editable={this.props.editable} />
{/*        {this.props.editable ? this.renderCustomDragLayer() : null}*/}
        {this.props.editable ? <CustomDragLayer snapToGrid={snapToGridWhileDragging} /> : null}
        <p>
          <label htmlFor="snapToGridWhileDragging">
            <input
              id="snapToGridWhileDragging"
              type="checkbox"
              checked={snapToGridWhileDragging}
              onChange={this.handleSnapToGridWhileDraggingChange}
            />
            <small>Snap to grid while dragging</small>
          </label>
          <br />
          <label htmlFor="snapToGridAfterDrop">
            <input
              id="snapToGridAfterDrop"
              type="checkbox"
              checked={snapToGridAfterDrop}
              onChange={this.handleSnapToGridAfterDropChange}
            />
            <small>Snap to grid after drop</small>
          </label>
          <br />
          <label htmlFor="deleteMode">
            <input
              id="deleteMode"
              type="checkbox"
              checked={deleteMode}
              onChange={this.handleDeleteMode}
            />
            <small id="deleteCheckbox">Delete mode</small>
          </label>
        </p>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Canvas)
