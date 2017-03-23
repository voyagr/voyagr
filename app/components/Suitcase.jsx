import React, {Component} from 'react'
import {storage, storageRef, auth} from 'APP/db/firebase' 
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
        let imageRef = storageRef.child(auth.currentUser.uid + "/" + this.state.image.name)
        imageRef.put(this.state.image)
                .then(snapshot => alert("Your image is now in our database FOREVER"))
                .catch(err => alert("YOU HAVE MADE A GRIEVOUS ERROR!!!"))
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

/* File
lastModified : 1486685563000
lastModifiedDate : Thu Feb 09 2017 19:12:43 GMT-0500 (EST)
name : "vaultboy.png"
size : 6791
type : "image/png"
webkitRelativePath : ""
__proto__: File
*/