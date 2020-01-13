import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBar from './SearchBar'
import {  Button} from "react-bootstrap";

//this Component is the navigation bar. It defines how to get to each component 
export default class NaviBar extends Component { 




      logout = () => {
          this.props.auth.logout({
               returnTo: 'http://localhost:3000/LogOutcallback'
             });
      }

      login = () => {
          this.props.auth.loginWithRedirect();


      }
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
          {   this.props.authenticated || window.handleRedirectCallbackAlreadyCalled === 1 ?  <Button variant="outline-success" onClick={this.logout}> Log Out  </Button>
               : <Button variant="outline-success"onClick={this.login}> Log In  </Button> 
          
          }  
          <LinkContainer to="/MyOrders">
                 <NavItem>Order History</NavItem>
            </LinkContainer>

              </Nav>


              <SearchBar filterList={this.props.filterList}/>
            </Navbar.Collapse>
          </Navbar>
  }
    
}