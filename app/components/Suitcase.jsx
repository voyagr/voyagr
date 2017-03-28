//test if the correct entry was made in the db
//test if video is working

import React, {Component} from 'react'
import {storage, storageRef, auth, database} from 'APP/db/firebase'
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Radio } from 'react-bootstrap'

export default class Suitcase extends Component {
  constructor () {
    super()
    this.state = {
      image: null,
      mediaType: null,
      selectedTrip: null,
      showInvalidAlert: false,
      showSuccessAlert: false,
      err: null,
    }
    this.handleFailedUpload = this.handleFailedUpload.bind(this)
    this.handleSuccessUpload = this.handleSuccessUpload.bind(this)
    this.handleMediaTypeChange = this.handleMediaTypeChange.bind(this)
  }

  componentDidMount () {
    this.unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid
        const dbUserPhotosRef = database.ref(`photos/${userId}`)
        dbUserPhotosRef.on('value', (snapshot) => this.setState({
          photos: snapshot.val(),
        }))
        // get user trip ids
        database
          .ref(`userTrips/${userId}`)
          .on('value', (snapshot) => {
            this.setState({
              trips: snapshot.val(),
            })

            let tripIds
            if (snapshot.val()) {
              tripIds = Object.keys(snapshot.val())

              // get trip names into an obj on the state
              // { tripId: tripName }
              let tripNames = {}
              tripIds.map(tripId => {
                database
                  .ref(`tripInfo/${tripId}/name`)
                  .on('value', (snapshot) => {
                    tripNames[tripId] = snapshot.val()
                    this.setState({ tripNames: tripNames })
                  })
              })
            }
          })
      }
    })
  }

  handleUploadChange (e) {
    e.preventDefault()
    this.state.image = e.target.files[0]
    this.setState({
      showInvalidAlert: false,
      showSuccessAlert: false,
      err: null
    })
  }

  handleMediaTypeChange (e) {
    e.preventDefault()
    const mediaType = e.target.value
    this.setState({mediaType})
  }

  handleTripChange (e) {
    this.state.selectedTrip = e.target.value
  }

  handleFailedUpload (err) {
    return (
      <Alert bsStyle="danger">
        <p>{err}</p>
      </Alert>
    )
  }

  handleSuccessUpload () {
    return (
      <Alert bsStyle="success">
        <p>Upload successful.</p>
      </Alert>
    )
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.image) {
      let imageRef = storageRef.child(auth.currentUser.uid + '/' + this.state.image.name)
      imageRef.put(this.state.image)
              .then(snapshot => {
                  const user = auth.currentUser.uid
                  //creates reference to folder in db for all photos belonging to user
                  const userPhotosRef = database.ref(`photos/${user}`)
                  //pushes an object with a unique key and download url as value for photo
                  const newPhotoKey = userPhotosRef.push(snapshot.downloadURL).key

                  if (this.state.selectedTrip) {
                    database
                      .ref(`tripPhotos/${this.state.selectedTrip}`)
                      .update({
                        [newPhotoKey]: snapshot.downloadURL
                      })
                  }
              })
              .then(() => this.setState({ showSuccessAlert: true })) //this is where we need to add the push to db
              .catch(err => this.setState({ showInvalidAlert: true, error: err }))
    } else this.setState({
      showInvalidAlert: true,
      err: 'Please choose a file to upload.'
    })
  }

  render () {
    const trips = this.state.tripNames
    const tripIds = trips && Object.keys(trips)
    const keys = this.state.photos && Object.keys(this.state.photos)

    return (
      <div>
        <h1>Suitcase</h1>
        <h2>Here is all your media!</h2>

        {/* upload form */}
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
          <ControlLabel>Upload files</ControlLabel>
          <FormControl
            id="formControlsFile"
            type="file"
            label="File"
            onChange={this.handleUploadChange.bind(this)}
            accept=".gif, .jpg, .png, .mp3, .mp4, .mov"
          />
          <p className="help-block">
            Media supported: .jpg, .png, .gif, .mp4, .mov, .mp3
          </p>
          {this.state.showInvalidAlert ? this.handleFailedUpload(this.state.err) : null}
          {this.state.showSuccessAlert ? this.handleSuccessUpload() : null}

        {/*  media type select */}
            <ControlLabel>Media Type</ControlLabel>
            <FormControl
              id="formControlsMediaType"
              componentClass="select"
              placeholder="select"
              onChange={this.handleMediaTypeChange}
            >
              <option value="select">select one</option>
              <option value="video">video</option>
              <option value="image">image</option>
            </FormControl>
                <p className="help-block">
            File Types Supported: Video, Pictures
          </p>

          {/* trip selector */}
          <ControlLabel>Add to trip (optional)</ControlLabel>
          <FormControl componentClass="select" multiple onChange={this.handleTripChange.bind(this)}>

            {trips ? tripIds.map((tripId, idx) => {
              return (
                <option key={idx} value={tripId}>{trips[tripId]}</option>
              )
            }) : <option>You don't have any trips yet!</option> }

          </FormControl>

          <Button type="submit">Upload File(s)</Button>
        </Form>

        {/* media display */}
        <div>
          <h2>Photos</h2><br />
          {keys ? keys.map(photoKey => {
            return (
              <div key={photoKey} style={{
                display: 'inline-block',
                margin: 1 + 'em',
              }}>
                <img src={this.state.photos[photoKey]} height="300px" />
              </div>
            )
          }) : <p>Upload some photos!</p>}
        </div>
      </div>
    )
  }
}


/* This is all the format of the information
on the file at the time of upload --
lastModified : 1486685563000
lastModifiedDate : Thu Feb 09 2017 19:12:43 GMT-0500 (EST)
name : "vaultboy.png"
size : 6791
type : "image/png"
webkitRelativePath : ""
__proto__: File
*/
