import { database } from 'APP/db/firebase'

export const getTripNames = function (tripIds) {
	tripIds.map(tripId => {
		database
			.ref(`tripInfo/${tripId}/name`)
			.on('value', (snapshot) =>
				this.state.tripNames.push(snapshot.val())
			)
		console.log(this.state.tripNames)

	})
}
