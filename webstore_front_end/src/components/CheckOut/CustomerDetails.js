import React from 'react';
import {Form, Col,   Row} from 'react-bootstrap' 
import RubberBand  from 'react-reveal/RubberBand'
 

//this form contains the text fields for gathering the customer details 
export default class CustomerDetails extends React.Component {

        state = {firstName: '', lastName: '', email: ''}
		//if state changes in CustomerDetails, it will trigger parent component to update state too. 
        handleChange(newState) {
                this.setState(newState, () => {
                    if (this.props.onChanged)
                    this.props.onChanged(this.state);
                });





        }

        render() {
                return (
                    <Form>
                            <RubberBand  when={this.props.flag && !Boolean(this.state.firstName)}> 
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    First Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    className={
                                    this.props.flag && !Boolean(this.state.firstName)
                                        ? "ShowRed"
                                        : " "
                                    }
                                    type="text" 
                                    value={this.state.firstName}
                                    onChange={event => this.handleChange({firstName: event.target.value})}
                                    placeholder="First Name" />
                                    </Col>
                                </Form.Group>
                                </RubberBand >

                                <RubberBand  when={this.props.flag && !Boolean(this.state.lastName)}> 
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    Last Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    className={
                                    this.props.flag && !Boolean(this.state.lastName)
                                        ? "ShowRed"
                                        : " "
                                    }
                                    type="text" 
                                    value={this.state.lastName}
                                    onChange={event => this.handleChange({lastName: event.target.value})}
                                    placeholder="Last Name" />
                                    </Col>
                                </Form.Group>
                                </RubberBand >

                                <RubberBand  when={this.props.flag && !Boolean(this.state.email)}> 
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    Email
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    className={
                                    this.props.flag && !Boolean(this.state.email)
                                        ? "ShowRed"
                                        : " "
                                    }
                                    type="text" 
                                    value={this.state.email}
                                    onChange={event => this.handleChange({email: event.target.value})}
                                    placeholder="Email" />
                                    </Col>
                                </Form.Group>
                                </RubberBand >

                    </Form>



                )




        }







}