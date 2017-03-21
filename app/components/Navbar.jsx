import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, pullRight } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function () {
  return (
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
      <LinkContainer to="/login">
        <NavItem eventKey={1} href="#">Log in</NavItem>
      </LinkContainer>
      <LinkContainer to="/signup">
        <NavItem eventKey={2} href="#">Sign up</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
  )
}


