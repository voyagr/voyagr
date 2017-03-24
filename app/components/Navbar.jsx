import React, { Component } from 'react'
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, pullRight } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { auth } from 'APP/db/firebase'
import { browserHistory } from 'react-router'

function logout () {
  auth
  //logout
  .signOut()
  .then(() => browserHistory.push('/landing'))
  .catch(function(error) {
    let errorCode = error.code
    let errorMessage = error.message
      console.log('ERROR', errorCode, errorMessage)
  })
}


export default class NavbarComponent extends Component {
    constructor () {
        super()
        this.state = {
            user: null,
        }
        this.renderButtons = this.renderButtons.bind(this)
    }

    componentWillMount () {
        this.unsubscribe = auth.onAuthStateChanged((user) => {
            this.setState({ user: user })
        })
    }

    componentWillUnmount () {
        this.unsubscribe()
    }
    
    renderButtons () {
      console.log("USER", this.state.user)
      if (this.state.user) {
        return (
          <div>
            <Nav pullRight>
              <LinkContainer to="/suitcase">
                <NavItem eventKey={1}>Suitcase</NavItem>
              </LinkContainer>        
              <LinkContainer onSelect={logout} to="/">
                <NavItem eventKey={2} >Log Out</NavItem>
              </LinkContainer> 
            </Nav>
          </div>
        )
      } 
    }
 
  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Voyagr</a>
          </Navbar.Brand>
        </Navbar.Header>
        { this.renderButtons() }
      </Navbar>
    )
  }
}

