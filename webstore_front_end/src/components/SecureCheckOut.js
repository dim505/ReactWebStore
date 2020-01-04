import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Flip from 'react-reveal/Flip';

export default class  SecureCheckOut extends React.Component {
    state = {authenticated: false,
            ContinueAsGuest: false}  
    constructor(props) {
      super(props);
      this.HandleLogin = this.HandleLogin.bind(this)
  
  
    }
  
    async componentDidMount () {
        const isLoggedIn = await this.props.auth.isAuthenticated();
        this.setState({ authenticated: isLoggedIn})
    }
    
  
    async HandleLogin () {
  
      await this.props.auth.loginWithRedirect();
  
  
    }

    async ContinueAsGuest () {
      this.setState({ContinueAsGuest: true})

    }
  
  
    render () {
  
          return (
 
            this.state.authenticated || this.state.ContinueAsGuest
            ? this.props.children :


            <Flip left cascade>
                <div className="CheckOutSecc">
                  <h1> Please select from the following options below</h1>
                  <Button onClick={() => this.HandleLogin()} variant="outline-primary"> Click here to Log in or Sign Up</Button>
                   <Button onClick={() => this.ContinueAsGuest() } variant="outline-primary"> Click here to continue as guest </Button> 


                </div>
              </Flip>
          )
  
  
  
      }
  
  
  
  }