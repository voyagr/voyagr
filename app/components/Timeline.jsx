import React, {Component} from 'react'
import { auth, database } from 'APP/db/firebase'
import { browserHistory } from 'react-router'
import { Grid, Col, Image } from 'react-bootstrap'

export default class Timeline extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      displayName: null,
      trips: {},
    }
    this.renderItems = this.renderItems.bind(this)
  }

  componentWillMount () {
    this.unsubscribe = auth.onAuthStateChanged((user) => {
      this.setState({ user: user, displayName: user.displayName })
      return database.ref('userTrips/' + user.uid)
      .on('value', snap => {
        let userTrips = snap.val()
        this.setState({tripIds: userTrips})
        let tripIds = Object.keys(userTrips)
        // console.log('1', this.state.trips)
        tripIds.map((tripId) => {
          return database.ref(`tripInfo/${tripId}`)
          .on('value', snap => {
            this.setState({
              [tripId]: snap.val()
            })
              console.log('2', this.state.trips)
          })
        })
      })
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  renderItems() {
    // console.log(Object.keys(this.state.trips))

    const tripIds = this.state.tripIds
    // console.log(tripIds)
    // console.log(this.state.trips)

    if (this.state.user) {
      return (
        <div>
          <h1>Timeline</h1>
          <h3>Welcome, {this.state.displayName}. Here are your trips!</h3>
          <Grid>
            {Object.keys(this.state.trips).length > 0 ? console.log(this.state.trips) : console.log('wtf')}

            { Object.keys(this.state.trips).map(tripId => {
              return (
                <Col lg={4} key={tripId} >
                  <div className="trip-card">
                    <a href={`/canvas/${this.state.trips[tripId]}`}>
                    <Image src="./imgs/world_map1.jpg" thumbnail />
                    {console.log(tripId)}
                    <h3>{this.state.trips[tripId]}</h3>
                    <strong></strong>
                    </a>
                  </div>
                </Col>
                )
              })
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
