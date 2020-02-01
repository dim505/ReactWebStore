import React from 'react';
import Button from 'react-bootstrap/Button';
import Flip from 'react-reveal/Flip';

export default class  SecureCheckOut extends React.Component {
    state = {authenticated: false,
            ContinueAsGuest: false}  
    constructor(props) {
      super(props);
      this.HandleLogin = this.HandleLogin.bind(this)
  
  
    }
  
    async componentDidMount () {
		//Checks if a user is logged in 
        const isLoggedIn = await this.props.auth.isAuthenticated();
		//sets state if user is logged in
        this.setState({ authenticated: isLoggedIn})
    }
    
  
    async HandleLogin () {
	 //when clicked, this redirects the user to the auth0 login page 
      await this.props.auth.loginWithRedirect();
  
  
    }
		//when clicked this flag will allow the user to continue as guest at checkout
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