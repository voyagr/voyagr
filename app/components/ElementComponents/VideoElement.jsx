import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from '../utils/shouldPureComponentUpdate'
import { DefaultPlayer as Video } from 'react-html5video'
// import 'react-html5video/dist/styles.css';

class VideoElement extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    console.log(this.props)
    return (
      <Video id={`image-size-${this.props.size}`} autoPlay loop muted
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            // poster="http://sourceposter.jpg"
            onCanPlayThrough={() => {
                // Do stuff
            }}>
            <source src={this.props.source} />
            <track label="English" kind="subtitles" srcLang="en" default />
        </Video>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(VideoElement)
