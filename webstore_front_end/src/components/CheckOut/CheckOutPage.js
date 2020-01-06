import React from 'react';
import {Row, Col} from 'react-bootstrap'
import {OrderSummary} from './OrderSummary'
import CheckOutCustBillDelivCCForm from './CheckOutCust_Bill_Deliv_CC_Form'
import OrderSeccessful from "./OrderSeccessful"
import Fade from 'react-reveal/Fade';


//This component defines the outline for the the check out cart 

//this component will contain a quick summary of what you are ordering 
 //<OrderSummary />
							 
				 
//this contains the text fields to collect the customers personal and credit card information 
//   <CheckOutCust_Bill_Deliv_CC_Form /> 
export default class CheckOutPage extends React.Component{
    state = {WasOrderSeccessful: false}

	//WasOrderSeccessful function was triggered from child component CheckOutCustBillDelivCCForm and its state is set to show the 
	// OrderSeccessful component
    WasOrderSeccessful = (newDetails)  => {

        this.setState({WasOrderSeccessful: newDetails})


    }

    

    render () {

		// checks if the order successfully went through, if no it will show the regular checkout page 
        if (this.state.WasOrderSeccessful === false) {

            return (
            <Fade top>    
                <Row> 
                     <Col md={8}>
 
                         <CheckOutCustBillDelivCCForm 
                            WasOrderSeccessful = {this.WasOrderSeccessful}
                            auth = {this.props.auth}
                         
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