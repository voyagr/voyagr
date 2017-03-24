import { database, auth } from 'APP/db/firebase'
import { browserHistory } from 'react-router'

export function startNewTrip() {
    let uid = auth.currentUser.uid
    let infoPostData = {
        name: 'Goa Trip',
        description: 'a holiday in paradise an have its own disappointments',
        startDate: '1/1/2012'
    }

    var newTripKey = database.ref('/tripInfo').push().key

    var updates = {}
    updates['/tripInfo/' + newTripKey] = infoPostData
    updates['/userTrips/' + uid] = {[newTripKey]: newTripKey}
    updates['/tripUsers/' + newTripKey] = {[uid]: uid}

    database.ref()
            .update(updates)
            .then(() => 
                browserHistory.push("/canvas/" + newTripKey)
            )
}