import React, { Component } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import { createTextBox } from '../reducers/elements'

class ToolBox extends Component {
	constructor(props) {
		super(props)

		this.onClickListener = this.onClickListener.bind(this)
	}

	onClickListener (event) {
		event.preventDefault()
		// how to make id ?
		let newTextBox = {
			'3': {
				top: 100,
				left: 100,
				size: 'small',
				text: 'i went on a trip',
			}
		}

		this.props.createTextBox(newTextBox)
	}

	render () {
		console.log('toolbox', this.props)
		return (
			<div>
				<ButtonToolbar>
					<Button bsStyle="primary" bsSize="large" onClick={this.onClickListener}>Add text box</Button>
				</ButtonToolbar>
			</div>
		)
	}
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { createTextBox })(ToolBox)
