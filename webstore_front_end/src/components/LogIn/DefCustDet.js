import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class DefCustomerDetails extends React.Component {
  state = { firstName: "", lastName: "", email: "", UseDefCustDetails: false };

  //triggers parent function to keep track of the state when ever a user types something in the textboxes
  handleChange(newState) {
    debugger;
    this.setState(newState, () => {
      if (this.props.onChanged) this.props.onChanged(this.state);
    });
  }

  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }

  componentDidMount() {
    //calls this function upon mounting the component to get the account information to fill out the forms
    this.GetAccountInfo();
  }

  GetAccountInfo = async () => {
    //gets token to present to backend API  from Auth0 to show this is a valid user
    const BearerToken = await this.props.auth.getTokenSilently();
    //Makes API call to get account user name and email
    var results = await axios
      .get("https://webstorebackend.azurewebsites.net/api/login/GetDefCustomerDetails", {
        headers: { Authorization: `bearer ${BearerToken}` },
      })
      .then(async (results) => {
        if (results.data[0].useDefCustDetails === "True") {
          await this.setState({ UseDefCustDetails: true });
        } else {
          await this.setState({ UseDefCustDetails: false });
        }

        console.log(results.data);
        ///sets state to fill form
        await this.setState({
          firstName: results.data[0].custFirstName,
          lastName: results.data[0].custLastName,
          email: results.data[0].custEmail,
        });
        this.props.onChanged(this.state);
      });
  };

  render() {
    return (
      <div>
        <Form>
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
                id="DeffirstName"
                type="text"
                value={this.state.firstName}
                onChange={(event) =>
                  this.handleChange({ firstName: event.target.value })
                }
                placeholder="Default First Name Not Set"
              />
            </Col>
          </Form.Group>

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
                id="DeflastName"
                type="text"
                value={this.state.lastName}
                onChange={(event) =>
                  this.handleChange({ lastName: event.target.value })
                }
                placeholder="Default Last Name Not Set"
              />
            </Col>
          </Form.Group>

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
                id="DefEmail"
                type="text"
                value={this.state.email}
                onChange={(event) =>
                  this.handleChange({ email: event.target.value })
                }
                placeholder="Default Email Not Set"
              />
            </Col>
          </Form.Group>
        </Form>

        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.UseDefCustDetails}
              onChange={(event) =>
                this.handleChange({ UseDefCustDetails: event.target.checked })
              }
              value="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          }
          label="Please check box if want to use default account details at checkout"
        />
      </div>
    );
  }
}
