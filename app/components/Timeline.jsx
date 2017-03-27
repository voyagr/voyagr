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
            database.ref('userTrips/' + user.uid)
            .on('value', snap => {
                let userTrips = snap.val()
                this.setState({trips: userTrips})
                let tripIds = Object.keys(this.state.trips) 
                tripIds.map((tripId) => {
                    database.ref(`tripInfo/${tripId}`)
                    .on('value', snap => {
                        this.state.trips[tripId] = snap.val()
                     })
                })
            })
        })
    }

    componentWillUnmount () {
        this.unsubscribe()
    }

    renderItems() {
        if (this.state.user) {
            return (
                <div>
                    <h1>Timeline</h1>
                    <h3>Welcome, {this.state.displayName}. Here are your trips!</h3>
                    <Grid>
                            { Object.keys(this.state.trips).map(tripId => {
                                return (<Col lg={4} key={tripId} >
                                        <div className="trip-card">
                                            <a href={`/canvas/${this.state.trips[tripId]}`}>
                                            <Image src="./imgs/world_map1.jpg" thumbnail />
                                            {this.state.trips[tripId]}
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
