import React, {Component} from 'react'
import { auth, database } from 'APP/db/firebase'
import { browserHistory } from 'react-router'
import store from '../store';


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
                        //console.log(this.state.trips[tripId].name)
                     })
                })
                console.log(this.state)
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
                        { Object.keys(this.state.trips).map(tripId => {
                            
                            return (<li key={tripId}><a href={`/canvas/${this.state.trips[tripId]}`}>{this.state.trips[tripId]}</a></li>)
                            })
                        }
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