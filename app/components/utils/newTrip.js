import { database, auth } from 'APP/db/firebase'
import { browserHistory } from 'react-router'

export function startNewTrip() {
  let uid = auth.currentUser.uid
  let infoPostData = {
    name: 'A Trip',
    description: 'A description',
    startDate: '1/1/2000'
  }

  var newTripKey = database.ref('/userTrips/' + uid).push().key

  var updates = {}
  updates[`/tripInfo/${newTripKey}`] = infoPostData
  updates[`/userTrips/${uid}/${newTripKey}`] = newTripKey
  updates[`/tripUsers/${newTripKey}/${uid}`] = uid

  return database.ref()
    .update(updates)
    .then(() =>
        browserHistory.push("/canvas/" + newTripKey)
    )
}
