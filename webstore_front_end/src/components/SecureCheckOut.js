import React from 'react';
import Button from 'react-bootstrap/Button';

export default class  SecureCheckOut extends React.Component {
    state = {authenticated: false}  
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
  
  
    render () {
  
          return (
              this.state.authenticated 
              ? this.props.children : 
              
                <div>
                  <p> Please register or Log in to Complete your order </p>
                    <Button onClick={this.HandleLogin()} variant="outline-primary"> Log in or Sign Up</Button>
  
                </div>
          )
  
  
  
      }
  
  
  
  }