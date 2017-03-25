'use strict'

const router = require('express').Router()
const admin = require('firebase-admin')

const config = require('APP/firebaseConfig')
const firebase = require('firebase').initializeApp(config)
const database = firebase.database()

const serviceAccount = require('APP/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://voyagr-59d3e.firebaseio.com"
});

router.get('/', (req, res, next) => {
	const email = req.query.email
	const tripId = req.query.tripId

	admin.auth().getUserByEmail(email)
  .then(function(user) {
		let uid = user.uid
    database
		.ref(`/tripUsers/${tripId}`)
		.set ({
			[uid]: uid
		})
		.catch(console.error)
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
  });

	res.send(req.query)
})

module.exports = router
