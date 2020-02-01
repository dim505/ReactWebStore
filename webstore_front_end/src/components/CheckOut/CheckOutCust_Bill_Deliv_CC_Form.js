import React from 'react';
import CustomerDetails from './CustomerDetails'
import CustBillAddr from './CustomerBillingAddress'
import {Form} from 'react-bootstrap' 
import {StripeProvider, Elements} from 'react-stripe-elements'
import CustDelivAddr from './CustomerDeliveryAddress'
import CheckOutCCButtonSubmitForm from './CheckOutCC_ButtonSubmitForm';
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from "./ToolTip";


//this Component the text fields to collect the customers personal and credit card information
export default class CheckOutCustBillDelivCCForm extends React.Component {
	//declares the states for delivery, billing and customer information 
    state = {deliverToBillingAddress: false, 
        customer: {}, billingAddress: {}, 
        deliveryAddress: {},paymentToken: {}, 
         SessionId: localStorage.SessionId, CheckOutSubmitBtnCkcOnce: false,
         open: false,
         OrderSeccessful: false,
         OrderInProgress: false,
         CheckoutTime: ""
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
       onPaymentMethodChange = async (token) => {
        var today = new Date();             
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();                 
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();             
        var TimeStamp = date+' '+time;           

			//checks if the billing address same as delivery address check box is sticked. If yes, the deliver address
			//takes billing address values 
            if ( this.state.deliverToBillingAddress === true) {
                        this.setState({
                                deliveryAddress : this.state.billingAddress
                        })

            }

			//checks if all the fields have values before checkout can be completed 
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
                   
                //if all fields have a value, payment token state is updated 
                this.setState ({
                        CheckOutSubmitBtnCkcOnce: false,
                        paymentToken: token.id,
                        CheckoutTime: TimeStamp  
                    
                    
                    })  
                       
                    
            } else {
				//sets flags to show error boxes
                this.setState({
                    CheckOutSubmitBtnCkcOnce: true,
                    OpenErrorFillRedForms: true,
                    OrderInProgress: false
                })

               
                //sets state to false to make the fill red forms error box disspear 
                setTimeout(() => this.setState({ OpenErrorFillRedForms: false }), 6000);
            }



    }

    //function used to update parent component that will trigger the OrderSeccessful page to show 
    OrderSeccessful = (newDetails) => {

        this.props.WasOrderSeccessful(newDetails)
        
    }

    //function used to close the fill red forms error box
    handleClose() {
       
    
        this.setState({
          OpenErrorFillRedForms: false
        });


      }

	//tracks if order is in progress, and passes it to the appropriate component to display the spinner while the order is in progress
    OrderInProgress = (newDetail)  => {
            this.setState({OrderInProgress: newDetail})


      }


    render () {

    
            return ( 
                <div>
                              <Snackbar
                              anchorOrigin={{ vertical: "top", horizontal: "center" }}
                              open={this.state.OpenErrorFillRedForms}
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
                          flag={this.state.CheckOutSubmitBtnCkcOnce}
                          onChanged={this.handleCustomerDetailsUpdated} />
                          <h4>Billing Address     </h4>
                          <CustBillAddr 
                          flag={this.state.CheckOutSubmitBtnCkcOnce}
                          onChanged={this.handleBillingddressDetailsUpdated}/>
                          <Form.Check inline label="Please click check box if delivery address is the same as billing address" type="checkbox" id="BillToDeliveryCheckBox"  onClick={() => this.toggleUseBillingAddress() }/>                    
                          {!this.state.deliverToBillingAddress &&
                                  <div>
                                      <h4> Delivery Address     </h4>
                                      <CustDelivAddr 
                                      ShowDeliv={this.state.deliverToBillingAddress}
                                      flag={this.state.CheckOutSubmitBtnCkcOnce}
                                      onChanged={this.handleDeliveryaddressDetailsUpdated}/>
                                  </div>
                            }
                          <StripeProvider apiKey='pk_test_zaWyvliomz572zcBnFEvreOs00ykM1wcnO'>
                              <Elements>
                              <Tooltip
                                  placement="top"
                                  tooltip="Would you like to simulate a real world checkout? Please enter following Test Credit Card information ''4242 4242 4242 4242 04/24 242 42424'' "
                              >
                                  <CheckOutCCButtonSubmitForm onPaymentMethodChange={this.onPaymentMethodChange}
                                                  state = {this.state}
                                                  OrderSec = {this.OrderSeccessful}
                                                  OrderInProgress = {this.state.OrderInProgress}
                                                  auth = {this.props.auth}

                                  
                                  />
                              </Tooltip>
                              </Elements>
                          </StripeProvider>
                  </div> )


            





    }



}