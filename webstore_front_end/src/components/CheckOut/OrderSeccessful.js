import React, { Component } from 'react';
import CheckMark from "./CheckMark.png"
import Fade from 'react-reveal/Fade';
import Image from 'react-bootstrap/Image'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'    

//this component tells the user that the order successfully went through 
export default class OrderSeccessful extends Component {

render () {

    return (

        <Fade top>  

    <div className="CheckOutSecc"> 
    <div id="CheckOutSecPic">
       <ResponsiveEmbed aspectRatio="4by3">  
                <Image  src={CheckMark} alt="CheckMark" rounded />
        </ResponsiveEmbed>
    </div>
    
    
        <h1> Order was successfully placed</h1>
        </div>  
        </Fade>
    )
 
        
    


}

}