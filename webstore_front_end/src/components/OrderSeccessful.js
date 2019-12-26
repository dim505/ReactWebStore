import React, { Component } from 'react';
import CheckMark from "./CheckMark.png"
import Fade from 'react-reveal/Fade';


//this component display more information about the product 
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