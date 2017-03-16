import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';

const mapStateToProps = (state, ownProps) => {
	return {
		x: 0,
		startingY: 0
	}
}

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			photoPosition: [100, 300]
		}
	}



	render() {
		return (
			<Canvas props={this.props} />
		)
	}
}

export default connect(mapStateToProps)(CanvasContainer)
