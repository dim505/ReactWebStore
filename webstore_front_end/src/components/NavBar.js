import React, { Component } from 'react';
import { Navbar, Nav, FormControl, Form, Button, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBar from './SearchBar'

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
                
            <LinkContainer to="/CheckOut">
                 <NavItem>Check Out</NavItem>
            </LinkContainer>

              </Nav>
              <SearchBar filterList={this.props.filterList}/>
            </Navbar.Collapse>
          </Navbar>
  }
    
}