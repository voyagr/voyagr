import React from 'react'
import {ButtonGroup, Button} from 'react-bootstrap'

const renderPageNavButtons = (props) => {
  let nextPageDisabled, previousPageDisabled
  if (props.pageInfo) {
    nextPageDisabled = props.pageInfo.nextPage === ''
    previousPageDisabled = props.pageInfo.previousPage === ''
  }
  return (
    <ButtonGroup>
      <Button
        href={`/canvas/${props.tripId}/${props.pageInfo.previousPage}`}
        disabled={previousPageDisabled}
      >
        Previous Page
      </Button>
      <Button
        href={`/canvas/${props.tripId}/${props.pageInfo.nextPage}`}
        disabled={nextPageDisabled}
      >
        Next Page
      </Button>
    {/*if next page is enabled, then add a page is disabled*/}
      <Button
        onClick={props.addNewPage}
        disabled={!nextPageDisabled}
      >
        Add A Page
      </Button>
    </ButtonGroup>
  )
}

export default renderPageNavButtons
