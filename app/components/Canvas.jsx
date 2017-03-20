import React, { Component } from 'react';

import Page from './Page';

class Canvas extends Component {
	constructor (...args) {
		super(...args)

		this.state = {
			drag: null,
			photo: {
				x: 0, y: 0,
			},
		}
		this.onMouseDown = this.onMouseDown.bind(this)
		this.onMouseMove = this.onMouseMove.bind(this)
		this.onMouseUp = this.onMouseUp.bind(this)
	}

	onMouseDown (event) {
		// event.preventDefault()
		this.setState({
			drag: {
				x: event.nativeEvent.offsetX,
				y: event.nativeEvent.offsetY
			}
		})
		console.log('onMouseDown this.state.drag', this.state.drag)
	}

	onMouseMove (event) {
		event.preventDefault()
		if (this.state.drag) {
		console.log('onMouseMove', event.dataTransfer.getData('text'))
			this.setState({
				photo: {
					x: event.nativeEvent.pageX,
					y: event.nativeEvent.pageY,
				}
			})
		}
	}

	onMouseUp (event) {
		event.preventDefault()
		console.log('onMouseUp', this.state)
		this.setState({ drag: null })

		var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
		// const x = this.state.photo.x
		// const y = this.state.photo.y

		// setTimeout(() => {
		// 	this.setState({
		// 		photo: {
		// 			x: x,
		// 			y: y
		// 		}
		// 	})
		// }, 10)
	}

	render() {
		return (
			<div width="100%" height="100%">
				<Page
					onMouseDownProps={this.onMouseDown}
					onMouseMoveProps={this.onMouseMove}
					onMouseUpProps={this.onMouseUp}
					styleProps={{
						position: 'absolute',
						top: `${this.state.photo.y}px`,
						left: `${this.state.photo.x}px`,
					}}
				/>
			</div>
		)
	}
}

export default Canvas
