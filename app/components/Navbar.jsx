import React, { Component } from 'react'
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, pullRight } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../reducers/user'

const NavbarComponent = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Voyagr</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.4}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <LinkContainer onSelect={logout} to="/">
        <NavItem eventKey={1} >Log Out</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
)

export default NavbarComponent
