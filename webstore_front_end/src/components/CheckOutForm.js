import React from 'react';
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button } from "react-bootstrap";
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from "@material-ui/core/Snackbar";


 
//this Component will contain the button that will submit the order to the backend 
class CheckoutForm extends React.Component {


    constructor(props) {

        super(props);
        this.state = {
            
            OrderInProgress: props.OrderInProgress,
            OrderJustAdded : false,
            ShowErrorMessage: false
            

        }          

    }


  

    submit = async (event) => {

        
        
        
        //creates the new token
        let {token} = await this.props.stripe.createToken({ name: 'Name' });
        //updates the state with the new token
        this.props.onPaymentMethodChange(token);
         //if the token is not null, it will submit the order 
        if (token && this.props.state.flag === false) {      
            
            this.setState({OrderInProgress: true})
            
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
                this.setState({
                    deliverToBillingAddress: false,
                    customer: {},
                    billingAddress: {}, 
                    deliveryAddress: {},
                    paymentToken: {},  
                    SessionId: localStorage.SessionId, 
                    flag: false,
                    OrderJustAdded: true})
                this.props.OrderSec(this.state.OrderJustAdded)
                var Forms = document.getElementsByClassName("form-control")             
                for (var i=0; i < Forms.length; i++ ) {
                    if (Forms[i].type === 'text') {
                        Forms[i].value = '';
                    }
                }
            })  
            .catch ( () => {
                
                this.setState({
                    OrderInProgress: false,
                    OrderJustAdded: false,
                    ShowErrorMessage: true 
                
                })

             

                setTimeout(() => {
                    this.setState({

                        ShowErrorMessage: false

                    })
                }, 6000);

            })
            


        }  
        

          
    }

    render() {
        return (
            <div>
                <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={this.state.ShowErrorMessage}
            ContentProps={{
                "aria-describedby": "message-id"
            }}
            message={
                <span id="message-id">Opps!! Something went wrong!!! Please add items to your cart and try again</span>
            }
            />

                <h4>Payment Details</h4>
                <CardElement/>
                
                <Button className="CheckOutButton" color='primary' onClick={this.submit}>Place Order</Button>
                
                    {this.state.OrderInProgress ? (<CircularProgress />) : (<div> </div>)} 
                        
                     
                            

                

            </div>
        )
    }
}

//creates a stripe HOC 
export default injectStripe(CheckoutForm);
