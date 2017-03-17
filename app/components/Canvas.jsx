import React, { Component } from 'react';

import Page from './Page';

class Canvas extends Component {
	constructor (...args) {
		super(...args)

		this.state = {
			drag: true,
			photo: {
				x: 0, y: 0,
			},
		}
		this.onMouseDown = this.onMouseDown.bind(this)
		this.onMouseMove = this.onMouseMove.bind(this)
		this.onMouseUp = this.onMouseUp.bind(this)
	}

	onMouseDown (event) {
		event.preventDefault()
		this.setState({
			drag: true
		})
		console.log('onMouseDown this.state.drag', this.state.drag)
	}

	onMouseMove (event) {
		if (this.state.drag) {
		console.log('onMouseMove', event.nativeEvent.x)
			this.setState({
				photo: {
					x: event.nativeEvent.x,
					y: event.nativeEvent.y,
				}
			})
		}
	}

	onMouseUp (event) {
		event.preventDefault()
		console.log('onMouseUp')
		this.setState({ drag: null })
		const x = this.state.photo.x
		const y = this.state.photo.y

		setTimeout(() => {
			this.setState({
				photo: {
					x: x,
					y: y
				}
			})
		}, 10)
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
