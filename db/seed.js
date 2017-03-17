const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

const seedTrips = () => db.Promise.map(
[
  {
    name: "My trip to the EU",
    start_date: "2016-03-16 12:08:36.165-04",
    end_date: "2017-03-16 12:08:36.165-04",
    discription: "This was just my quick trip to the EU. It was soooooo much FUNNN!!!",
    style: {
      "color": "Purple", "background": "Black"
    }
  }, {
    name: "Roadtrip to CA!",
    start_date: "2017-03-04 12:08:36.165-04",
    end_date: "2017-03-16 12:08:36.165-04",
    discription: "I went on a trip to CA!",
    style: {
      "color": "red", "background": "paper"
    }
  }],
trip => db.model('trips').create(trip))

const seedPages = () => db.Promise.map(
[
  {display_info: {
      "photo": [{
        "x": "100","y": "100", "ref": "http://www.fillmurray.com/200/300"
      }, {
        "x": "200", "y": "200", "ref": "http://www.fillmurray.com/200/300"}
      ],
    "textBox": [{
        "x": "300", "y": "300", "size": "large", "text": "First day on the road"
      }, {
        "x": "50", "y": "200", "size": "large", "text": "We had a great time"
    }]}, trip_id: "1"},
  {display_info:{
    "textBox": [{
        "x": "300", "y": "300", "size": "large", "text": "First day on the road"
      }, {
        "x": "50", "y": "200", "size": "large", "text": "We had a great time"
    }]
  }, trip_id: "2"}],
page => db.model('pages').create(page))

db.didSync
  .then(() => db.sync({force: true}))
  .then(() => seedUsers())
  .then(([user1, user2]) =>
    seedTrips()
    .then(([trip1, trip2]) =>
      Promise.all([
        user1.setTrips(trip2),
        user2.setTrips(trip1)
        ])
      )
  )
  .then((results) => console.log(`Seeded users and trips`))
  .then(seedPages)
  .then(pages => console.log(`Seeded ${pages.length} pages OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
