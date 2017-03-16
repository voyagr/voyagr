import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import Photo from './Photo';
import ItemTypes from '../constants';

function moveKnight(toX, toY) {
  knightPosition = [toX, toY];
  emitChange();
}

const photoTarget = {
	drop (props, monitor) {
		movePhoto(props.x, props.y);
	}
}

function collect (connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}
}

export default class Canvas extends Component {
	render() {
		return (
			<Photo />
		)
	}
}

// export default DropTarget(ItemTypes.PHOTO, {})(Canvas);
