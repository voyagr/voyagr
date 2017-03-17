import React, { Component } from 'react';

import Photo from './Photo';

export default class Page extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<Photo
				onMouseDown={this.props.onMouseDown}
				onMouseMove={this.props.onMouseMove}
				onMouseUp={this.props.onMouseUp}
				style={this.props.style}
			/>
		)
	}
}

// export default DropTarget(ItemTypes.PHOTO, {})(Canvas);
