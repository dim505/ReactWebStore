import React from 'react';
import CustomerDetails from './CustomerDetails'
import Address from './address'
import {Form} from 'react-bootstrap' 
import {StripeProvider, Elements} from 'react-stripe-elements'
 
import CheckOutForm from './CheckOutForm';

export default class CheckOutSummary extends React.Component {
    state = {deliverToBillingAddress: false, customer: {}, billingAddress: {}, deliveryAddress: {},paymentToken: {} }

    handleCustomerDetailsUpdated = (newDetails) => {
        this.setState({customer: newDetails }) 



    }

    toggleUseBillingAddress = () => {
            this.setState({deliverToBillingAddress: !this.state.deliverToBillingAddress})
    }


    onPaymentMethodChange = (token) => {
            if (token) {
                    this.setState ({paymentToken: token})



            }



    }

    render () {
        return ( 
            <div>
                    <h4>Your Details    </h4>
                    <CustomerDetails onChanged={this.handleCustomerDetailsUpdated} />
                    <h4>Billing Address     </h4>
                    <Address onChanged={newAddress => this.setState({billingAddress: newAddress })}/>
                    <Form.Check inline label="Delivery Address Same As Billing Address?" type="checkbox" id="BillToDeliveryCheckBox"  onClick={() => this.toggleUseBillingAddress() }/>                    
                    {!this.state.deliverToBillingAddress &&
                            <div>
                                <h4> delivery Address     </h4>
                                <Address onChanged={newAddress => this.setState({deliveryAddress: newAddress })}/>
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