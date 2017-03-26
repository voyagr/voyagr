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
            console.log('userTrips/' + user.uid)
                //.once('value')
                // .then(snapshot => console.log("SNAP ---", snapshot.val())
                //     //updateStarCount(postElement, snapshot.val());
                // )
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
                        <h2>Welcome, {this.state.displayName}</h2>
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