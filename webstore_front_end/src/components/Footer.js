import React, { Component } from 'react';
import { Navbar } from "react-bootstrap";


export default class Footer extends Component { 
  render() {
   return <Navbar className='fixed-bottom' bg="light" expand="lg">

        
            <p>© Copyright 2019 Dmitriy <a href="https://github.com/dim505/ReactWebStore"> Click Here for Code </a> OR <a href="http://dmitriyprogrammingportfolio.tk/ReactWebStore"> click here to go back to my main portfolio </a> </p>
            
          
          </Navbar>
  }
    
}