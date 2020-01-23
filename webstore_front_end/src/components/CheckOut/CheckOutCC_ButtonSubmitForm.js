import React from 'react';
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button } from "react-bootstrap";
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from "@material-ui/core/Snackbar";


 
//this Component will contain the button that will submit the order to the backend 
class CheckoutCCButtSubmitForm extends React.Component {

//declares state  :
// OrderInProgress - used to trigger circular spinner when the checkout is in progress after submitting checkout
//ShowErrorMessage - used to 

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
        if (token && this.props.state.CheckOutSubmitBtnCkcOnce === false) {      
            
			//triggers  circular spinner to start spinning 
            this.setState({OrderInProgress: true})
            
			
			//checks if the billing address same as delivery address check box is sticked. If yes, the deliver address
			//takes billing address values 
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

            if (await this.props.auth.isAuthenticated() === true) {
                const BearerToken = await this.props.auth.getTokenSilently();

                			//makes the API call for the checkout 			
                            let result = Axios.post("http://localhost:51129/api/Checkout", Mydata
                            , 
                        {
                                headers: {'Authorization': `bearer ${BearerToken}`}

                        }
                        
                        )
                        .then(  (response) =>  {
                            //resets the state                  
                            this.setState({
                                deliverToBillingAddress: false,
                                customer: {},
                                billingAddress: {}, 
                                deliveryAddress: {},
                                paymentToken: {},  
                                SessionId: localStorage.SessionId, 
                                CheckOutSubmitBtnCkcOnce: false,
                                OrderJustAdded: true})

                                localStorage.removeItem("SessionId")
                                
                            //triggers the parent function to set state to show the Order was successful page
                            this.props.OrderSec(this.state.OrderJustAdded)
                            
                            //clears out all the form values 
                            var Forms = document.getElementsByClassName("form-control")             
                            for (var i=0; i < Forms.length; i++ ) {
                                if (Forms[i].type === 'text') {
                                    Forms[i].value = '';
                                }
                            }
                        })  
                        .catch ( () => {
                            //if there is an error in the API call, It resets state and triggers the error message to show
                            this.setState({
                                OrderInProgress: false,
                                OrderJustAdded: false,
                                ShowErrorMessage: true 
                            
                            })

                            
                            //Error message disappears after 6 seconds 
                            setTimeout(() => {
                                this.setState({

                                    ShowErrorMessage: false

                                })
                            }, 6000);

                        })


                
            } else {

                    			//makes the API call for the checkout 			
            let result = Axios.post("http://localhost:51129/api/Checkout", Mydata
           
           )
           .then(  (response) =>  {
              //resets the state                  
               this.setState({
                   deliverToBillingAddress: false,
                   customer: {},
                   billingAddress: {}, 
                   deliveryAddress: {},
                   paymentToken: {},  
                   SessionId: localStorage.SessionId, 
                   CheckOutSubmitBtnCkcOnce: false,
                   OrderJustAdded: true})
               //triggers the parent function to set state to show the Order was successful page
              this.props.OrderSec(this.state.OrderJustAdded)
            
               //clears out all the form values 
            var Forms = document.getElementsByClassName("form-control")             
               for (var i=0; i < Forms.length; i++ ) {
                   if (Forms[i].type === 'text') {
                       Forms[i].value = '';
                   }
               }
           })  
           .catch ( () => {
               //if there is an error in the API call, It resets state and triggers the error message to show
               this.setState({
                   OrderInProgress: false,
                   OrderJustAdded: false,
                   ShowErrorMessage: true 
               
               })

            

               //Error message disappears after 6 seconds 
               setTimeout(() => {
                   this.setState({

                       ShowErrorMessage: false

                   })
               }, 6000);

           })

            }
           

            


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
export default injectStripe(CheckoutCCButtSubmitForm);
