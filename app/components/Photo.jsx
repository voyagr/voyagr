import React, { Component } from 'react'
import clickdrag from 'react-clickdrag'

class Photo extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<div>
				<img
					src="https://www.gracehopper.com/images/gh-logo-sm-w-h_1.svg"
					onDragStart={this.props.onMouseDownProps}
					onDrag={this.props.onMouseMoveProps}
					onDragEnd={this.props.onMouseUpProps}
					style={this.props.styleProps}
				/>
			</div>
		)
	}
}

export default Photo;
