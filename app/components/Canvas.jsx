import React, { Component, PropTypes } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'; // try touch backend
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux'
import { movePhoto } from '../reducers/photo'
import CanvasContainer from '../containers/CanvasContainer';

import Page from './Page';

class Canvas extends Component {
	static propTypes = {
		position: PropTypes.objectOf(PropTypes.number),
		setPhotoPosition: PropTypes.func
	}

	// canMove (x, y) => {
	// 	const {px, py} = this.props.position

	// 	const dx = x - px
	// 	const dy = y - py
	// }

	movePhoto = (x, y) => {
		this.props.setPhotoPosition(x, y)
	}

	renderPhoto (x, y) {
		const {px, py} = this.props.position
		if (x === px && y === ky) {
			return <Photo />
		}
	}

	render() {
		return (
			<Page movePhoto={this.movePhoto} position={{x, y}}>
				{this.renderPhoto(x, y)}
			</Page>
		)
	}
}

const mapStateToProps = state => state

Canvas = DragDropContext(HTML5Backend)(Canvas)
Canvas = connect(mapStateToProps, {movePhoto})(Canvas)

export default Canvas
