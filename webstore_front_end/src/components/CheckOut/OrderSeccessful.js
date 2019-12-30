import React, { Component } from 'react';
import CheckMark from "./CheckMark.png"
import Fade from 'react-reveal/Fade';


//this component tells the user that the order successfully went through 
export default class OrderSeccessful extends Component {

render () {

    return (

        <Fade top>  

    <div className="CheckOutSecc"> 
        <img  src={CheckMark} alt="CheckMark"/>
        <h1> Order was successfully placed</h1>
        </div>  
        </Fade>
    )
 
        
    


}

}