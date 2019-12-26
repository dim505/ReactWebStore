import React from 'react';
import {Row, Col} from 'react-bootstrap'
import {OrderSummary} from './OrderSummary'
import CheckOutSummary from './CheckOutSummary'
import OrderSeccessful from "./OrderSeccessful"
import Fade from 'react-reveal/Fade';


//This component defines the outline for the the check out cart 

//this component will contain a quick summary of what you are ordering 
 //<OrderSummary />
							 
				 
//this contains the text fields to collect the customers personal and credit card information 
//   <CheckOutSummary /> 
export default class CheckOut extends React.Component{
    state = {WasOrderSeccessful: false}

    WasOrderSeccessful = (newDetails)  => {

        this.setState({WasOrderSeccessful: newDetails})


    }

    

    render () {


        if (this.state.WasOrderSeccessful === false) {

            return (
            <Fade top>    
                <Row> 
                     <Col md={8}>
 
                         <CheckOutSummary 
                            WasOrderSeccessful = {this.WasOrderSeccessful}
                         
                         /> 
                     </Col>
 
                     <Col md={4}>
                              <OrderSummary 
                           
                              
                              />
 
                     </Col>
 
                </Row>
 
            </Fade> 
         );



	
        }  else {

        return (<OrderSeccessful />)
        
    }
  
    






    }



}