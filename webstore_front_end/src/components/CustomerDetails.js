import React from 'react';
import {Form, Col, InputGroup, Row} from 'react-bootstrap' 


export default class CustomerDetails extends React.Component {

        state = {firstName: '', lastName: '', email: ''}

        handleChange(newState) {
                this.setState(newState, () => {
                    if (this.props.onChanged)
                    this.props.onChanged(this.state);
                });





        }

        render() {
                return (
                    <Form>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    First Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    type="text" 
                                    value={this.state.firstName}
                                    onChange={event => this.handleChange({firstName: event.target.value})}
                                    placeholder="First Name" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    Last Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    type="text" 
                                    value={this.state.lastName}
                                    onChange={event => this.handleChange({lastName: event.target.value})}
                                    placeholder="Last Name" />
                                    </Col>
                                </Form.Group>


                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    Email
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    type="text" 
                                    value={this.state.email}
                                    onChange={event => this.handleChange({email: event.target.value})}
                                    placeholder="Email" />
                                    </Col>
                                </Form.Group>


                    </Form>



                )




        }







}