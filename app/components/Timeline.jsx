import React, {Component} from 'react'
import { auth, database } from 'APP/db/firebase'
import { browserHistory } from 'react-router'


export default class Timeline extends Component {
    constructor () {
        super()
        this.state = {
            user: null,
            displayName: null,
            trips: null
        }
        this.renderItems = this.renderItems.bind(this)
    }

    componentWillMount () {
        this.unsubscribe = auth.onAuthStateChanged((user) => {
            this.setState({ user: user, displayName: user.displayName })
            database.ref('userTrips/' + user.uid)
                .on('value', snapshot => {
                    let userTrips = snapshot.val()
                    let timelineTrips = []
                    for (let key in userTrips) {
                        timelineTrips.push(userTrips[key]);
                    }
                    this.setState({trips: timelineTrips})
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
                    <h3>Welcome, {this.state.displayName}</h3>
                    <h3>Here are your trips!</h3>
                    <ul>
                        {this.state.trips && this.state.trips.map((tripName) =>
                            <li key={tripName}><a href={`/canvas/${tripName}`}>{tripName}</a></li>)}
                    </ul>
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