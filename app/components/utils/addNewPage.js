import {database} from 'APP/db/firebase'
import {browserHistory} from 'react-router'

export const addNewPage = (tripId, currentPageId) => {
  const pageDefaultData = {
    previousPage: currentPageId,
    nextPage: '',
  }

  var newPageKey = database.ref(`/tripPages/${tripId}`).push().key

  var updates = {}
  //creating first page of new trip in firebase db
  updates[`/tripPages/${tripId}/${newPageKey}`] = newPageKey
  updates[`/pageInfo/${newPageKey}`] = pageDefaultData
  updates[`/pageInfo/${currentPageId}/nextPage`] = newPageKey

  return database.ref()
    .update(updates)
    .then(() => {
      browserHistory.push(`/canvas/${tripId}/${newPageKey}`)
      location.reload(true)
    })
    .catch(console.error)
}
