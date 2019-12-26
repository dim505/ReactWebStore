import React from 'react';
import CustomerDetails from './CustomerDetails'
import Address from './address'
import {Form} from 'react-bootstrap' 
import {StripeProvider, Elements} from 'react-stripe-elements'
import DelivAddress from './DelivAddress'
import CheckOutForm from './CheckOutForm';
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from "./ToolTip";


//this Component the text fields to collect the customers personal and credit card information
export default class CheckOutSummary extends React.Component {
	//declares the states for delivery, billing and customer information 
    state = {deliverToBillingAddress: false, 
        customer: {}, billingAddress: {}, 
        deliveryAddress: {},paymentToken: {}, 
         SessionId: localStorage.SessionId, flag: false,
         open: false,
         OrderSeccessful: false,
         OrderInProgress: false 
        }

	//this function updates the state of the customer personal information with each letter entered in the text boxes 
    handleCustomerDetailsUpdated = (newDetails) => {
        this.setState({customer: newDetails }) 
    }

	//this function updates the state of the customer billing address information with each letter entered in the text boxes 
    handleBillingddressDetailsUpdated = (newDetails) => {
        this.setState({billingAddress: newDetails }) 
    }

	//this function updates the state of the delivery address information with each letter entered in the text boxes 
    handleDeliveryaddressDetailsUpdated = (newDetails) => {
        this.setState({deliveryAddress: newDetails }) 
    }


	//function used to update deliverToBillingAddress flag, this hides the delivery address component if its has the same information as the billing address
    toggleUseBillingAddress = () => {
            this.setState({deliverToBillingAddress: !this.state.deliverToBillingAddress})
    }

     isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }



	//sets payment token state when the check out button is pressed 
    onPaymentMethodChange = (token) => {

            if ( this.state.deliverToBillingAddress === true) {
                        this.setState({
                                deliveryAddress : this.state.billingAddress
                        })

            }


            if (token && !this.isEmpty(this.state.customer.firstName) && 
            !this.isEmpty(this.state.customer.lastName) && 
            !this.isEmpty(this.state.customer.email) && 
            !this.isEmpty(this.state.billingAddress.StreetAddress) && 
            !this.isEmpty(this.state.billingAddress.city) &&
            !this.isEmpty(this.state.billingAddress.State) &&
            !this.isEmpty(this.state.billingAddress.ZipCode) &&
            !this.isEmpty(this.state.billingAddress.country) &&

           
            !this.isEmpty(this.state.deliveryAddress.StreetAddress) &&
            !this.isEmpty(this.state.deliveryAddress.city) &&
            !this.isEmpty(this.state.deliveryAddress.State) &&
            !this.isEmpty(this.state.deliveryAddress.ZipCode) &&
            !this.isEmpty(this.state.deliveryAddress.country)             
            
            ) {
                   
                
                this.setState ({
                        flag: false,
                        paymentToken: token.id,
                       
                    
                    
                    })  
                       
                    
            } else {

                this.setState({
                    flag: true,
                    open: true,
                    OrderInProgress: false
                })

               
                
                setTimeout(() => this.setState({ open: false }), 6000);
            }



    }

    
    OrderSeccessful = (newDetails) => {

        this.props.WasOrderSeccessful(newDetails)
        
    }

    
    handleClose() {
       
    
        this.setState({
          open: false
        });


      }

    OrderInProgress = (newDetail)  => {
            this.setState({OrderInProgress: newDetail})


      }


    render () {

    
            return ( 
                <div>
                              <Snackbar
                              anchorOrigin={{ vertical: "top", horizontal: "center" }}
                              open={this.state.open}
                              onClose={() => this.handleClose}
                              ContentProps={{
                                  "aria-describedby": "message-id"
                              }}
                              message={
                                  <span id="message-id">Please Fill Out All The Forms In Red</span>
                              }
                              />
                          <h4>Your Details    </h4>
                          <CustomerDetails
                          flag={this.state.flag}
                          onChanged={this.handleCustomerDetailsUpdated} />
                          <h4>Billing Address     </h4>
                          <Address 
                          flag={this.state.flag}
                          onChanged={this.handleBillingddressDetailsUpdated}/>
                          <Form.Check inline label="Please click check box if delivery address is the same as billing address" type="checkbox" id="BillToDeliveryCheckBox"  onClick={() => this.toggleUseBillingAddress() }/>                    
                          {!this.state.deliverToBillingAddress &&
                                  <div>
                                      <h4> Delivery Address     </h4>
                                      <DelivAddress 
                                      ShowDeliv={this.state.deliverToBillingAddress}
                                      flag={this.state.flag}
                                      onChanged={this.handleDeliveryaddressDetailsUpdated}/>
                                  </div>
                            }
                          <StripeProvider apiKey='pk_test_zaWyvliomz572zcBnFEvreOs00ykM1wcnO'>
                              <Elements>
                              <Tooltip
                                  placement="top"
                                  tooltip="Would you like to simulate a real world checkout? Please enter following Test Credit Card information ''4242 4242 4242 4242 04/24 242 42424'' "
                              >
                                  <CheckOutForm onPaymentMethodChange={this.onPaymentMethodChange}
                                                  state = {this.state}
                                                  OrderSec = {this.OrderSeccessful}
                                                  OrderInProgress = {this.state.OrderInProgress}


                                  
                                  />
                              </Tooltip>
                              </Elements>
                          </StripeProvider>
                  </div> )


            





    }



}