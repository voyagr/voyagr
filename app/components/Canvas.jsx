import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'; // try touch backend
import { DragDropContext } from 'react-dnd';
import CanvasContainer from '../containers/CanvasContainer';

import Page from './Page';

class Canvas extends Component {
	render() {
		return (
			<Page />
		)
	}
}

export default DragDropContext(HTML5Backend)(CanvasContainer);
