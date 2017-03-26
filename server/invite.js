'use strict'

const router = require('express').Router()
const admin = require('firebase-admin')

const config = require('APP/firebaseConfig')
const firebase = require('firebase').initializeApp(config)
const database = firebase.database()

const serviceAccount = require('APP/serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://voyagr-59d3e.firebaseio.com'
})

router.post('/', (req, res, next) => {
	console.log(req.body)
	const email = req.body.email
	const tripId = req.body.tripId

	admin.auth().getUserByEmail(email)
		.then(function(user) {
			console.log(user)
			const uid = user.uid // invited user id

			// add userId to tripUsers
			database
				.ref(`/tripUsers/${tripId}`)
				.update({
					[uid]: uid
				})
				.then(res.send)
				.catch(console.error)

			// add tripId to userTrips
			database
				.ref(`/userTrips/${uid}`)
				.update({
					[tripId]: tripId
				})
				.catch(console.error)

			res.send(user)

		})
		.catch(function(error) {
			console.log("Error fetching user data:", error)
  })
})

module.exports = router
