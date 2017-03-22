import React, {Component} from 'react'
import {connect} from 'react-redux'

class Timeline extends Component {
    render () {
        return (
            <div>
                <h1>Welcome, User!</h1>
                <h2>Your Trips</h2>
                {}
            </div>
        )
    }
}

const mapStateToProps = (state) => state

export default connect(
    mapStateToProps,
    null
)(Timeline)
