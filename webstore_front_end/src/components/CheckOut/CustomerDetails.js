import React from 'react';
import {Form, Col,   Row} from 'react-bootstrap' 
import RubberBand  from 'react-reveal/RubberBand'
import axios from "axios";
 

//this form contains the text fields for gathering the customer details 
export default class CustomerDetails extends React.Component {

        state = {firstName: '', lastName: '', email: ''}
        
        componentDidMount() {
            //calls this function upon mounting the component to get the account information to fill out the forms 
             this.GetAccountInfo();
           }
    
        async GetAccountInfo () {
    
                        //gets token to present to backend API  from Auth0 to show this is a valid user 
          const BearerToken = await this.props.auth.getTokenSilently();
          //Makes API call to get account user name and email
            var  results = await axios.get("https://webstorebackend.azurewebsites.net/api/login/GetDefCustomerDetails",
            {
             
             headers: {'Authorization': `bearer ${BearerToken}`}
        
             
           }).then (async (results) => {
            if (results.data[0].useDefCustDetails === 'True') 
             
            {
                
                
                
                console.log(results.data)
                ///sets state to fill form 
                 await this.setState({
                    firstName: results.data[0].custFirstName,
                    lastName: results.data[0].custLastName,
                    email: results.data[0].custEmail
                   
        
                 })
                 this.props.onChanged(this.state)
            
            
            }
          
    

    
    
           })
    
    
           }
        
           isEmpty(str) {
            return (!str || /^\s*$/.test(str));
        }

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
                            <RubberBand  when={this.props.flag && this.isEmpty(this.state.firstName)}> 
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    First Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    className={
                                    this.props.flag && this.isEmpty(this.state.firstName)
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

                                <RubberBand  when={this.props.flag && this.isEmpty(this.state.lastName)}> 
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    Last Name
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    className={
                                    this.props.flag && this.isEmpty(this.state.lastName)
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

                                <RubberBand  when={this.props.flag && this.isEmpty(this.state.email)}> 
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                    Email
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control 
                                    className={
                                    this.props.flag && this.isEmpty(this.state.email)
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