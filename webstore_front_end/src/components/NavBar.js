import React, { Component } from 'react';
import { Navbar, Nav, FormControl, Form, Button, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


export default class NaviBar extends Component { 
  render() {
   return <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
                 <Navbar.Brand>WebStore </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
            <LinkContainer to="/">
                 <NavItem>Home</NavItem>
            </LinkContainer>

            <LinkContainer to="/cart">
                 <NavItem>View Shopping Cart</NavItem>
            </LinkContainer>
                

              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Not Working Yet :C</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
  }
    
}