import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import RemoveButton from "./RemoveBtn";
import LightSpeed from "react-reveal/LightSpeed";
import UpdateQtyBtn from "./UpdateQtyBtn";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    //binds the handleItemRemoved function so it can set state
    this.handleItemRemoved = this.handleItemRemoved.bind(this);
    //sets the initial state of the shopping cart
    this.state = {
      items: [{ id: -1, name: "Test Product", prodQty: 0, price: 0 }],
      QtyUpdateNotifcationSnBar: false,
      openSnBaropenSnBar: false,
    };
  }

  async componentDidMount() {
    await this.getCart();
  }

  async getCart() {
    //if there is a session ID stored in the browser, it will make a API call to get the cart
    if (localStorage.SessionId !== undefined) {
      //creates the URL to be called
      const URL = `https://webstorebackend.azurewebsites.net/api/cart/${localStorage.SessionId}`;

      //makes thr API call
      var response = await Axios.get(URL).then((response) => {
        //additional checks for after a user adds an item and deletes its again. Prevent error after the first item delete
        if (response.data.length === 0) {
          //sets state to default
          this.setState({
            items: [{ id: -1, name: "Test Product", prodQty: 0, price: 0 }],
          });
        } else {
          //prepulates the cart with items with the browers session id
          this.setState({
            items: response.data,
          });
        }
      });
    }
  }

  //function used to refresh the cart after an item is deleted
  async handleItemRemoved() {
    // console.log(props.id)
    //refreshes the cart after item is removed
    await this.getCart();
    //shows the notification to the user that remove the item was successful
    this.setState({
      openSnBar: true,
    });

    //notification goes away after a few seconds
    setTimeout(
      () =>
        this.setState({
          openSnBar: false,
        }),
      3500
    );
  }

  handleQtyUpdate = async () => {
    //refreshes the cart after the quantity was updated
    await this.getCart();
    //shows the notification to the user that updating the quantity was successful
    this.setState({
      QtyUpdateNotifcationSnBar: true,
    });

    //notification goes away after a few seconds
    setTimeout(
      () =>
        this.setState({
          QtyUpdateNotifcationSnBar: false,
        }),
      3500
    );
  };

  render() {
    //if the state id is equal to the initial state then it displays empty cart
    if (this.state.items[0].id === -1 || this.state.items.length === 0) {
      return (
        <LightSpeed right>
          <div className="CenterCart">
            <h1>
              <i className="em em-dizzy_face" aria-label="DIZZY FACE" />
              ....No items Found....
              <i className="em em-dizzy_face" aria-label="DIZZY FACE" />
            </h1>
          </div>
        </LightSpeed>
      );
    }
    //else it returns the cart of items
    else {
      return (
        <LightSpeed right>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell> Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>
                    {" "}
                    <Link to={"./CheckOut"}>
                      {" "}
                      <Button variant="outlined" color="primary">
                        {" "}
                        Check Out{" "}
                      </Button>{" "}
                    </Link>{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Container>
                        <Row className="UpdateQtyRow">
                          <Col md="auto">{item.prodQty} </Col>
                          <Col md="auto">
                            <UpdateQtyBtn
                              id={item.id}
                              handleQtyUpdate={this.handleQtyUpdate}
                              QtyUpdateNotifcationSnBar={
                                this.state.QtyUpdateNotifcationSnBar
                              }
                            />
                          </Col>
                        </Row>
                      </Container>
                    </TableCell>

                    <TableCell>${item.price}</TableCell>
                    <TableCell>
                      <RemoveButton
                        id={item.id}
                        onItemRemoved={this.handleItemRemoved}
                        openSnBar={this.state.openSnBar}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </LightSpeed>
      );
    }
  }
}
