import React, {Component} from 'react'
import {connect} from 'react-redux'

class Suitcase extends Component {
    render () {
        return (
            <div>
                <h1>Suitcase</h1>
                <h2>Here is all your media!</h2>
                {}
            </div>
        )
    }
}

const mapStateToProps = (state) => state

export default connect(
    mapStateToProps,
    null
)(Suitcase)