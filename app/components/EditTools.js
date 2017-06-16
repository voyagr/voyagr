import React from 'react'
import {Col} from 'react-bootstrap'
import ToolBox from './ToolBox'

const EditTools = (props) =>
  <Col lg={3}>
    <ToolBox
      tripInfo={props.tripInfo}
      tripInfoRef={props.tripInfoRef}
      selected={props.selected}
      tripId={props.tripId}
      pageInfo={props.pageInfo} //should be all set up for page info view/edit
      pageInfoRef={props.pageInfoRef} //should be all set up for page info view/edit
      pageId={props.pageId}
    />
  </Col>

export default EditTools
