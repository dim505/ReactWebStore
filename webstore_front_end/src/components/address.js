import React from 'react';
import {Form, Col, InputGroup, Row} from 'react-bootstrap' 
 

export default class Address  extends React.Component {
    state = {StreetAddress: "", city: "", State: "",ZipCode: "",  country: "" };

    handleChange (newState) {
        this.setState(newState, () => this.props.onChanged(this.State));


    }

    render () {
        return (
            <Form>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    StreetAddress
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    type="text" 
                                    value={this.state.StreetAddress}
                                    onChange={event => this.handleChange({StreetAddress: event.target.value})}
                                    placeholder="StreetAddress" />
                                    </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    city
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    type="text" 
                                    value={this.state.city}
                                    onChange={event => this.handleChange({city: event.target.value})}
                                    placeholder="city" />
                                    </Col>
                            </Form.Group>


                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    State
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    type="text" 
                                    value={this.state.State}
                                    onChange={event => this.handleChange({State: event.target.value})}
                                    placeholder="State" />
                                    </Col>
                            </Form.Group>


                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    ZipCode
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    type="text" 
                                    value={this.state.ZipCode}
                                    onChange={event => this.handleChange({ZipCode: event.target.value})}
                                    placeholder="ZipCode" />
                                    </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                    country
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    type="text" 
                                    value={this.state.country}
                                    onChange={event => this.handleChange({country: event.target.value})}
                                    placeholder="country" />
                                    </Col>
                            </Form.Group>

                            
                
 




            </Form>




        )




    }


}

