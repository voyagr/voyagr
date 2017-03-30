import React, {Component} from 'react'
import update from 'react/lib/update'
import { auth, database } from 'APP/db/firebase'
import { browserHistory } from 'react-router'
import { Button, Grid, Col, Image } from 'react-bootstrap'

export default class Timeline extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      trips: {},
    }
    this.renderItems = this.renderItems.bind(this)
    this.deleteTrip = this.deleteTrip.bind(this)
  }

  componentWillMount () {
    this.unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) browserHistory.push('/landing')
      // set current user
      this.setState({
        user: user,
      })

      // get the ids of that user's trips
      return database.ref(`userTrips/${user.uid}`)
      .on('value', snap => {
        let userTrips = snap.val()
        let tripIds

        if (userTrips) { tripIds = Object.keys(userTrips) }
        else { return }

        // get the info for that user's trips
        tripIds.map((tripId) => {
          return database.ref(`tripInfo/${tripId}`)
          .on('value', snap => {
            // add the trips to the state
            this.setState(update(this.state, {
              trips: {
                $merge: { [tripId]: snap.val() }
              }
            }))
          })
        })
      })
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  deleteTrip (event) {
    const confirmDelete = confirm('Deleting this trip will only remove it from your own personal timeline; any other contributors will still have access. Are you sure you want to continue?')

    if (confirmDelete) {
      const tripId = event.target.value
      const trips = this.state.trips

      database
        .ref(`userTrips/${this.state.user.uid}/${tripId}`)
        .remove(() => {
          // save an instance of the current trips on the state
          const tripsToBeUpdated = trips
          // delete the trip from that new instance
          delete tripsToBeUpdated[tripId]
          // set the state so the page will update
          this.setState({ trips: tripsToBeUpdated })
        })
    }
  }

  renderItems () {
    const tripIds = Object.keys(this.state.trips)
    const trips = this.state.trips
    console.log('trips', trips)

    if (this.state.user) {
      return (
        <div>
          <Grid>
            <Col lg={12}>
              <h1>Timeline</h1>
              <h3>Welcome, {this.state.user.displayName}. Here are your trips!</h3>
              <h4>Click into one to edit, or click above to start a new trip.</h4>
            </Col>

            {/* trip boxes */}
            {tripIds.length > 0 ? tripIds.map(tripId => {
              return (
                <Col lg={6} key={tripId}>
                  <div className="trip-card">
                    <a href={`/canvas/${tripId}/${trips[tripId].startPage}`}>
                      <Image src="./imgs/yellow_house.png" thumbnail />
                      <h3>{trips[tripId].name}</h3>
                    </a>
                    {/* trip info */}
                    <p>
                      {trips[tripId].description}
                    </p>
                    <p>
                      <strong>Start date:</strong> {trips[tripId].startDate}
                    </p>
                    {/* delete button */}
                    <Button
                      bsStyle="danger"
                      bsSize="xsmall"
                      onClick={this.deleteTrip}
                      value={tripId}
                    >
                      Delete trip
                    </Button>
                    </div>
                </Col>
              )
            }) :
            <Col lg={12}>
              <h3>No trips to show. Start putting some images in your Suitcase.</h3>
            </Col>
          }
          </Grid>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
          {this.renderItems()}
      </div>
    )
  }
}

