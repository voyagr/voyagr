import React, { Component } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'

export default class ToolBox extends Component {
	constructor(props) {
		super(props)
	}

	render () {
		return (
			<div>
				<ButtonToolbar>
					<Button bsStyle="primary" bsSize="large">Add text box</Button>
				</ButtonToolbar>
			</div>
		)
	}
}
