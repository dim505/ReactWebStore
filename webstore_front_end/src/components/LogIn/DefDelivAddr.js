import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default class DefDelivAddress extends React.Component {
  state = { StreetAddress: "", city: "", State: "", ZipCode: "", country: "",useDefDelivAddr: false };

  componentDidMount() {
    //calls this function upon mounting the component to get the account information to fill out the forms 
     this.GetDelivAddrInfo();
   }

   isEmpty(str) {
    return (!str || /^\s*$/.test(str));
    }

 
   GetDelivAddrInfo = async () => {

                    	//gets token to present to backend API  from Auth0 to show this is a valid user 
                      const BearerToken = await this.props.auth.getTokenSilently();

  
                      //Makes API call to get Billing address for account user 
                     var  results = await axios.get("https://webstorebackend.azurewebsites.net/api/login/GetDefDelivAddr",
                      {
                       headers: {'Authorization': `bearer ${BearerToken}`}
                     }).then (async (results) => {
                      console.log(results.data)
                      //sets state to fill form

                      if (results.data[0].useDefDelivAddr === 'True') 
         
                      {await this.setState({useDefDelivAddr: true})}
                      else { await this.setState({useDefDelivAddr: false})}

                       this.setState({
                        StreetAddress: results.data[0].streetAddress,
                        city: results.data[0].city,
                        State: results.data[0].state, 
                        ZipCode: results.data[0].zipCode, 
                        country: results.data[0].country
                        


                       })

                       this.props.onChanged(this.state)
                       
                     })

                     

 
     };

     



  //triggers parent function to keep track of the state when ever a user types something in the textboxes 
  handleChange(newState) {
    this.setState(newState, () => this.props.onChanged(this.state));
  }

  render() {
    return (
      
        <div>
        <h4> Default Delivery Address </h4>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Street Address
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  className={
                    this.props.flag && this.isEmpty(this.state.StreetAddress)
                      ? "ShowRed"
                      : " "
                  }
                  type="text"
                  id="DefDelivStreetAddress"
                  value={this.state.StreetAddress}
                  onChange={event =>
                    this.handleChange({ StreetAddress: event.target.value })
                  }
                  placeholder="Default Street Address Not Set"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                City
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  className={
                    this.props.flag && this.isEmpty(this.state.city)
                      ? "ShowRed"
                      : " "
                  }
                  type="text"
                  id="DefDelivcity"
                  value={this.state.city}
                  onChange={event =>
                    this.handleChange({ city: event.target.value })
                  }
                  placeholder="Default City Not Set"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                State
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  className={
                    this.props.flag && this.isEmpty(this.state.State)
                      ? "ShowRed"
                      : " "
                  }
                  type="text"
                  id="DefDelivState"
                  value={this.state.State}
                  onChange={event =>
                    this.handleChange({ State: event.target.value })
                  }
                  placeholder="Default State Not Set"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Zip Code
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  className={
                    this.props.flag && this.isEmpty(this.state.ZipCode)
                      ? "ShowRed"
                      : " "
                  }
                  type="text"
                  id="DefDelivZipCode"
                  value={this.state.ZipCode}
                  onChange={event =>
                    this.handleChange({ ZipCode: event.target.value })
                  }
                  placeholder="Default Zip Code Not Set"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Country
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  className={
                    this.props.flag && this.isEmpty(this.state.country)
                      ? "ShowRed"
                      : " "
                  }
                  type="text"
                  id="DefDelivcountry"
                  value={this.state.country}
                  onChange={event =>
                    this.handleChange({ country: event.target.value })
                  }
                  placeholder="Default Country Not Set"
                />
              </Col>
            </Form.Group>
          </Form>

          <FormControlLabel
            control={
              <Checkbox
              checked={this.state.useDefDelivAddr}
              onChange={(event) => this.handleChange({useDefDelivAddr: event.target.checked })}  
              value="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            
            }
            label="Please check box if want to use default Delivery Address at checkout"
          />


        </div>
    
    );
  }
}
