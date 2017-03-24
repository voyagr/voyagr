import React, {Component} from 'react'
import {storage, storageRef, auth, database} from 'APP/db/firebase'
import {Form, FormGroup, Input, Button} from 'react-bootstrap'


export default class Suitcase extends Component {
    constructor () {
        super()
        this.state = {
            image: null
        }
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
                    const userPhotosRef = database.ref(`photos/${user}`)
                    userPhotosRef.push(snapshot.downloadURL)
                    .then(something => console.log('returned from push', something))
                })
                .then(() => alert("Your image is now in our database FOREVER")) //this is where we need to add the push to db
                .catch(err => alert(`YOU HAVE MADE A GRIEVOUS ERROR!!! Error: ${err}`))
    }

    render () {
        return (
            <div>
                <h1>Suitcase</h1>
                <h2>Here is all your media!</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="file" onChange={this.handleChange.bind(this)} />
                    <button type="submit">Upload</button>
                </form>
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
