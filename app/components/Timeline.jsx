import React, {Component} from 'react'
import update from 'react/lib/update'
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

    renderItems() {
      const tripIds = Object.keys(this.state.trips)

        if (this.state.user) {
            return (
                <div>
                    <Grid>
                        <Col lg={12} >
                        <h1>Timeline</h1>
                        <h3>Welcome, {this.state.displayName}. Here are your trips!</h3>
                        </Col>

                          {/* trip boxes */}
                            {tripIds.map(tripId => {
                              return (
                                <Col lg={6} key={tripId}>
                                  <div className="trip-card">
                                    <a href={`/canvas/${this.state.trips[tripId]}`}>
                                      <Image src="./imgs/yellow_house.png" thumbnail />
                                      <h3>{this.state.trips[tripId].name}</h3>
                                    </a>
                                    <p>
                                      {this.state.trips[tripId].description}
                                    </p>
                                    <p>
                                      <strong>Start date:</strong> {this.state.trips[tripId].startDate}
                                    </p>
                                  </div>
                                </Col>
                              )
                            })}
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

