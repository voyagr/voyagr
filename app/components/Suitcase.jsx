import React, {Component} from 'react'
import {storage, storageRef, auth, database} from 'APP/db/firebase'
import {Button, ControlLabel, Form, FormControl, Input } from 'react-bootstrap'


export default class Suitcase extends Component {
	constructor () {
		super()
		this.state = {
			image: null
		}
	}

	componentDidMount () {
		this.unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const userId = user.uid
				const dbUserPhotosRef = database.ref(`photos/${userId}`)
				dbUserPhotosRef.on('value', (snapshot) => this.setState({
					photos: snapshot.val(),
				}))
			}
		})
	}

	handleChange (e) {
		e.preventDefault()
		this.state.image = e.target.files[0]
		}

	handleSubmit(e) {
		e.preventDefault()
		let imageRef = storageRef.child(auth.currentUser.uid + '/' + this.state.image.name)
		imageRef.put(this.state.image)
						.then(snapshot => {
								const user = auth.currentUser.uid
								//creates reference to folder in db for all photos belonging to user
								const userPhotosRef = database.ref(`photos/${user}`)
								//pushes an object with a unique key and download url as value for photo
								userPhotosRef.push(snapshot.downloadURL)
						})
						.then(() => alert("Your image is now in our database FOREVER")) //this is where we need to add the push to db
						.catch(err => alert(`YOU HAVE MADE A GRIEVOUS ERROR!!! Error: ${err}`))
	}

	render () {
		const keys = this.state.photos && Object.keys(this.state.photos)

		return (
			<div>
				<h1>Suitcase</h1>
				<h2>Here is all your media!</h2>
				<Form onSubmit={this.handleSubmit.bind(this)}>
					<ControlLabel>Upload files</ControlLabel>
					<FormControl
						id="formControlsFile"
						type="file"
						label="File"
						onChange={this.handleChange.bind(this)}
						accept=".gif, .jpg, .png, .mp3, .mp4, .mov"
					/>
					<p className="help-block">
						Types supported: .jpg, .png, .gif, .mp4, .mov, .mp3
					</p>

					<Button type="submit">Upload File(s)</Button>
				</Form>
				<div id="photo-panel">
					{keys ? keys.map(photoKey => {
						return (
							<div className="drawer-photo" key={photoKey}>
							<img src={this.state.photos[photoKey]} />
							<Button id={this.state.photos[photoKey]} onClick={this.addPhoto}>+</Button>
						</div>)
					}) : null}
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
