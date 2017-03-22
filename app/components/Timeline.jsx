import React, {Component} from 'react'
import {connect} from 'react-redux'

class Timeline extends Component {
    render () {
        return (
            <div>
                <h1>Timeline</h1>
                <h2>Welcome, User</h2>
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
