import { database, auth } from 'APP/db/firebase'
import { browserHistory } from 'react-router'

export const startNewTrip = () => {
  const uid = auth.currentUser.uid
  const tripDefaultData = {
    name: 'A Trip',
    description: 'A description',
    startDate: '1/1/2000'
  }
  const pageDefaultData = {
    nextPage: '',
    previousPage: '',
  }

  var newTripKey = database.ref('/userTrips/' + uid).push().key
  var newPageKey = database.ref('/tripPages/' + newTripKey).push().key

  var updates = {}
  //creating trip in firebase db
  updates[`/tripInfo/${newTripKey}`] = tripDefaultData
  updates[`/userTrips/${uid}/${newTripKey}`] = newTripKey
  updates[`/tripUsers/${newTripKey}/${uid}`] = uid

  //creating first page of new trip in firebase db
  updates[`/tripPages/${newTripKey}/${newPageKey}`] = newPageKey
  updates[`/pageInfo/${newPageKey}`] = pageDefaultData

  return database.ref()
    .update(updates)
    .then(() => {
      browserHistory.push(`/canvas/${newTripKey}/${newPageKey}`)
      location.reload()
    })
    .catch(console.error)
}
