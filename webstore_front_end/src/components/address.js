import React from 'react';
import {Form, Col, InputGroup, Row} from 'react-bootstrap' 
 
//this form contains the text fields for the Billing section of the shopping cart 
export default class Address  extends React.Component {
    state = {StreetAddress: "", city: "", State: "",ZipCode: "",  country: "" };
 
 
	// as a user types into the text fields, it updates the state with each letter
    handleChange (newState) {
        this.setState(newState, () => this.props.onChanged(this.state));


    }

    render () {
        return (
            <Form>
                        <Form.Group as={Row} >
                                    <Form.Label column sm="2">
                                    Street Address
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                                  className={
                                                    this.props.flag && !Boolean(this.state.StreetAddress)
                                                      ? "ShowRed"
                                                      : " "
                                                  }
                                    type="text" 
                                    value={this.state.StreetAddress}
                                    onChange={event => this.handleChange({StreetAddress: event.target.value})}
                                    placeholder="Street Address" />
                                    </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    city
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    className={
                                    this.props.flag && !Boolean(this.state.city)
                                        ? "ShowRed"
                                        : " "
                                    }
                                    type="text" 
                                    value={this.state.city}
                                    onChange={event => this.handleChange({city: event.target.value})}
                                    placeholder="City" />
                                    </Col>
                            </Form.Group>


                            <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    State
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    className={
                                    this.props.flag && !Boolean(this.state.State)
                                        ? "ShowRed"
                                        : " "
                                    }
                                    type="text" 
                                    value={this.state.State}
                                    onChange={event => this.handleChange({State: event.target.value})}
                                    placeholder="State" />
                                    </Col>
                            </Form.Group>


                            <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    Zip Code
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    className={
                                    this.props.flag && !Boolean(this.state.ZipCode)
                                        ? "ShowRed"
                                        : " "
                                    }
                                    type="text" 
                                    value={this.state.ZipCode}
                                    onChange={event => this.handleChange({ZipCode: event.target.value})}
                                    placeholder="Zip Code" />
                                    </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    Country
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    className={
                                    this.props.flag && !Boolean(this.state.country)
                                        ? "ShowRed"
                                        : " "
                                    }
                                    type="text" 
                                    value={this.state.country}
                                    onChange={event => this.handleChange({country: event.target.value})}
                                    placeholder="Country" />
                                    </Col>
                            </Form.Group>

                            
                
 




            </Form>




        )




    }


}

