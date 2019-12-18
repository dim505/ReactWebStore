import React from 'react';
import CustomerDetails from './CustomerDetails'
import Address from './address'
import {Form} from 'react-bootstrap' 
import {StripeProvider, Elements} from 'react-stripe-elements'
import DelivAddress from './DelivAddress'
import CheckOutForm from './CheckOutForm';

//this Component the text fields to collect the customers personal and credit card information
export default class CheckOutSummary extends React.Component {
	//declares the states for delivery, billing and customer information 
    state = {deliverToBillingAddress: false, customer: {}, billingAddress: {}, deliveryAddress: {},paymentToken: {},  SessionId: localStorage.SessionId, flag: false}

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
            if (token && !this.isEmpty(this.state.customer) && !this.isEmpty(this.state.billingAddress) && !this.isEmpty(this.state.deliveryAddress) ) {
                    this.setState ({
                        flag: false,
                        paymentToken: token.id})

                    
            } else {

                this.setState({flag: true})
                alert("Please Fill Out All Forms In Red")
            }



    }

    render () {
        return ( 
          <div>
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
                                flag={this.state.flag}
                                onChanged={this.handleDeliveryaddressDetailsUpdated}/>
                            </div>
                      }
                    <StripeProvider apiKey='pk_test_zaWyvliomz572zcBnFEvreOs00ykM1wcnO'>
                        <Elements>

                            <CheckOutForm onPaymentMethodChange={this.onPaymentMethodChange}
                                            state = {this.state}
                            
                            />

                        </Elements>
                    </StripeProvider>
            </div> )



    }



}