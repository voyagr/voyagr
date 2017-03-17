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
	}

	go (next) {
		this.setState(next)
	}

	pickUp (event) {
		console.log('pickUp', event)
		this.go({
			drag: {
				key: event.target.dataset.key,
				x: event.nativeEvent.offsetX,
				y: event.nativeEvent.offsetY,
			}
		})
	}

	drag (event) {
		console.log('drag', this.state)
		if (this.state.drag) {
			this.go({
				photo: {
					x: event.nativeEvent.x - this.state.drag.x,
					y: event.nativeEvent.y - this.state.drag.y,
				}
			})
		}
	}

	drop (event) {
		this.go({ drag: null })
	}

	render() {
		return (
			<Page
				onMouseDown={this.pickUp.bind(this)}
				onMouseMove={this.drag.bind(this)}
				onMouseUp={this.drop.bind(this)}
				style={{
					position: 'absolute',
					top: `${this.state.photo.y}px`,
					left: `${this.state.photo.x}px`,
				}}
			/>
		)
	}
}

export default Canvas
