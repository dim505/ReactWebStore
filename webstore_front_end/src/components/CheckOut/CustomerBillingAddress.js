import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import RubberBand from "react-reveal/RubberBand";
import axios from "axios";

//this form contains the text fields for the Billing section of the shopping cart
export default class CustBillAddr extends React.Component {
  state = { StreetAddress: "", city: "", State: "", ZipCode: "", country: "" };

  // as a user types into the text fields, it updates the state with each letter and triggers the parent components to update state too
  handleChange(newState) {
    this.setState(newState, () => this.props.onChanged(this.state));
  }

  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }

  componentDidMount() {
    //calls this function upon mounting the component to get the billing information to fill out the forms
    this.GetAccountInfo();
  }

  GetAccountInfo = async () => {
    //gets token to present to backend API  from Auth0 to show this is a valid user
    const BearerToken = await this.props.auth.getTokenSilently();
    //Makes API call to get account user name and email
    var results = "";

    //Makes API call to get Billing address for account user
    results = await axios
      .get("https://webstorebackend.azurewebsites.net/api/login/GetDefBillAddr", {
        headers: { Authorization: `bearer ${BearerToken}` },
      })
      .then(async (results) => {
        console.log(results.data);

        if (results.data[0].useDefBillAddr === "True") {
          //sets state to fill form
          this.setState({
            StreetAddress: results.data[0].streetAddress,
            city: results.data[0].city,
            State: results.data[0].state,
            ZipCode: results.data[0].zipCode,
            country: results.data[0].country,
          });

          this.props.onChanged(this.state);
        }
      });
  };

  render() {
    return (
      <Form>
        <RubberBand
          when={this.props.flag && this.isEmpty(this.state.StreetAddress)}
        >
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
                value={this.state.StreetAddress}
                onChange={(event) =>
                  this.handleChange({ StreetAddress: event.target.value })
                }
                placeholder="Street Address"
              />
            </Col>
          </Form.Group>
        </RubberBand>

        <RubberBand
          when={this.props.flag && this.isEmpty(this.state.StreetAddress)}
        >
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              city
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className={
                  this.props.flag && this.isEmpty(this.state.city)
                    ? "ShowRed"
                    : " "
                }
                type="text"
                value={this.state.city}
                onChange={(event) =>
                  this.handleChange({ city: event.target.value })
                }
                placeholder="City"
              />
            </Col>
          </Form.Group>
        </RubberBand>

        <RubberBand
          when={this.props.flag && this.isEmpty(this.state.StreetAddress)}
        >
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
                value={this.state.State}
                onChange={(event) =>
                  this.handleChange({ State: event.target.value })
                }
                placeholder="State"
              />
            </Col>
          </Form.Group>
        </RubberBand>

        <RubberBand
          when={this.props.flag && this.isEmpty(this.state.StreetAddress)}
        >
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
                value={this.state.ZipCode}
                onChange={(event) =>
                  this.handleChange({ ZipCode: event.target.value })
                }
                placeholder="Zip Code"
              />
            </Col>
          </Form.Group>
        </RubberBand>

        <RubberBand
          when={this.props.flag && this.isEmpty(this.state.StreetAddress)}
        >
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
                value={this.state.country}
                onChange={(event) =>
                  this.handleChange({ country: event.target.value })
                }
                placeholder="Country"
              />
            </Col>
          </Form.Group>
        </RubberBand>
      </Form>
    );
  }
}
