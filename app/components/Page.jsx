import React, { Component } from 'react';

import Photo from './Photo';

export default class Page extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<div width="100%" height="100%">
				<Photo
					onMouseDownProps={this.props.onMouseDownProps}
					onMouseMoveProps={this.props.onMouseMoveProps}
					onMouseUpProps={this.props.onMouseUpProps}
					styleProps={this.props.styleProps}
				/>
			</div>
		)
	}
}

// export default DropTarget(ItemTypes.PHOTO, {})(Canvas);
