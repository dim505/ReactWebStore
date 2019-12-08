import React from 'react';
import CustomerDetails from './CustomerDetails'
import Address from './address'
import {Form} from 'react-bootstrap' 
import {StripeProvider, Elements} from 'react-stripe-elements'
import DelivAddress from './DelivAddress'
import CheckOutForm from './CheckOutForm';

export default class CheckOutSummary extends React.Component {
    state = {deliverToBillingAddress: false, customer: {}, billingAddress: {}, deliveryAddress: {},paymentToken: {},  SessionId: localStorage.SessionId}

    handleCustomerDetailsUpdated = (newDetails) => {
        this.setState({customer: newDetails }) 
    }


    handleBillingddressDetailsUpdated = (newDetails) => {
        this.setState({billingAddress: newDetails }) 
    }

    handleDeliveryaddressDetailsUpdated = (newDetails) => {
        this.setState({deliveryAddress: newDetails }) 
    }



    toggleUseBillingAddress = () => {
            this.setState({deliverToBillingAddress: !this.state.deliverToBillingAddress})
    }


    onPaymentMethodChange = (token) => {
            if (token) {
                    this.setState ({paymentToken: token.id})



            }



    }

    render () {
        return ( 
            <div>
                    <h4>Your Details    </h4>
                    <CustomerDetails onChanged={this.handleCustomerDetailsUpdated} />
                    <h4>Billing Address     </h4>
                    <Address onChanged={this.handleBillingddressDetailsUpdated}/>
                    <Form.Check inline label="Please check box if delivery address is the same as billing address" type="checkbox" id="BillToDeliveryCheckBox"  onClick={() => this.toggleUseBillingAddress() }/>                    
                    {!this.state.deliverToBillingAddress &&
                            <div>
                                <h4> Delivery Address     </h4>
                                <DelivAddress onChanged={this.handleDeliveryaddressDetailsUpdated}/>
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