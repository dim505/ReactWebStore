import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBar from './SearchBar'
import {  Button} from "react-bootstrap";
import Tooltip from "../CheckOut/ToolTip";  

//this Component is the navigation bar. It defines how to get to each component 
export default class NaviBar extends Component { 



	//when the log out button is clicked, user is logged out and redirected to the log out component
      logout = () => {
          this.props.auth.logout({
               returnTo: 'https://reactwebstore.azurewebsites.net/LogOutcallback'
             });
      }
	  
	  
		//when a user clicks log in, they are redirected to the Auth0 log in page 
      login = () => {
          this.props.auth.loginWithRedirect();


      }



     render() 
     
     {      
          
          const QuestIconStyle = {
          marginTop: "7px",
          fontSize: "24px",
          color:"red"
    
    
        }
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
            {   this.props.authenticated || window.handleRedirectCallbackAlreadyCalled === 1 ?

               <LinkContainer to="/MyOrders">
                         <NavItem>Order History</NavItem>
               </LinkContainer> : <div></div>
               }

               {   this.props.authenticated || window.handleRedirectCallbackAlreadyCalled === 1 ?

               <LinkContainer to="/DefMainPage">
                         <NavItem>Account Details</NavItem>
               </LinkContainer> : <div></div>
               }

          {   this.props.authenticated || window.handleRedirectCallbackAlreadyCalled === 1 ?  <Button className="NavBtn" variant="outline-success" onClick={this.logout}> Log Out  </Button>
               : <Button className="NavBtn" variant="outline-success" onClick={this.login}> Log In  </Button>  
          
          }  
                       <Tooltip
        placement="bottom"
        tooltip="Would you like to Log in without creating an account?
        Please use these credentials:
        **** Username: test@mailinator.com ****
        **** Password: Abcd@1234 *****       
        "
                              >
                                
        <i className="fa fa-question-circle" style={QuestIconStyle}></i> 
        
        </Tooltip>


          

              </Nav>


              <SearchBar filterList={this.props.filterList}/>
            </Navbar.Collapse>
          </Navbar>
  }
    
}