import React from 'react';
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button } from "react-bootstrap";
import Axios from 'axios';
 
//this Component will contain the button that will submit the order to the backend 
class CheckoutForm extends React.Component {


    constructor(props) {

        super(props);
        this.state = {
			//flag used to display the notification when an item is added to the cart
            OrderJustAdded : false 
        }          

    }


  

    submit = async (event) => {

        //creates the new token
        let {token} = await this.props.stripe.createToken({ name: 'Name' });
        //updates the state with the new token
        this.props.onPaymentMethodChange(token);
         //if the token is not null, it will submit the order 
        if (token && this.props.state.flag === false) {      
            
            if (this.state.deliverToBillingAddress === true) {

                    this.setState({

                        deliveryAddress: this.state.billingAddress

                    } )



            }

            //declares emypt object 
            var Mydata = {};
            var CheckOutdata = this.props.state
			//prepopulates the object
            Mydata.CheckOutdata = CheckOutdata 
			//makes the API call for the checkout 			
            let result = Axios.post("https://webstorebackend.azurewebsites.net/api/Checkout", Mydata)
            .then(  (response) =>  {
                console.log(response)   
                
                
                //sets flag to true to let user know that an item was added 
                this.setState({
                    deliverToBillingAddress: false,
                    customer: {},
                    billingAddress: {}, 
                    deliveryAddress: {},
                    paymentToken: {},  
                    SessionId: localStorage.SessionId, 
                    flag: false,
                    OrderJustAdded: true})

                var Forms = document.getElementsByClassName("form-control")
                           
                for (var i=0; i < Forms.length; i++ ) {
   

                    if (Forms[i].type == 'text') {
                        Forms[i].value = '';
                    }


                }
                
                //after a certain amount of time, the display goes away 
                setTimeout(() => this.setState({
                    
                    

                    OrderJustAdded: false}), 6000   )



            })
            


        }  
        

          
    }

    render() {
        return (
            <div>
                <h4>Payment Details</h4>
                <CardElement/>
                <Button color='primary' onClick={this.submit}>Place Order</Button>
                {this.state.OrderJustAdded &&  <span className="alert alert-primary"> Order Was Successfully Placed</span>}

            </div>
        )
    }
}

//creates a stripe HOC 
export default injectStripe(CheckoutForm);
