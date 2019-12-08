import React from 'react';
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button } from "react-bootstrap";
import Axios from 'axios';
 

class CheckoutForm extends React.Component {

    submit = async (event) => {

        //object destruct javasscript
        let {token} = await this.props.stripe.createToken({ name: 'Name' });
        console.log(token)
        this.props.onPaymentMethodChange(token);
          
        if (token) {      
            var Mydata = {};
            var CheckOutdata = this.props.state
            Mydata.CheckOutdata = CheckOutdata      
            let result = Axios.post("http://localhost:51129/api/Checkout", Mydata)
            .then(  (response) =>  {
                console.log(response)               
            })
            


        }  
        

          
    }

    render() {
        return (
            <div>
                <h4>Payment Details</h4>
                <CardElement/>
                <Button color='primary' onClick={this.submit}>Place Order</Button>
            </div>
        )
    }
}

export default injectStripe(CheckoutForm);
