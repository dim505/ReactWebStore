import React from "react";
import Axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fade from "react-reveal/Fade";

//this Component will contain the button that will submit the order to the backend
export default class MyOrders extends React.Component {
  state = {
    data: [],
  };

  GetHistoricalOrders = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    //makes api call to get all orders
    var results = await Axios.get("http://localhost:51129/api/login", {
      headers: { Authorization: `bearer ${BearerToken}` },
    }).then((results) => {
      this.setState({
        data: results.data,
      });
      console.log(results.data);
      console.log(results);
    });
  };

  componentDidMount() {
    //this function makes the API call to get all orders associated with the account
    this.GetHistoricalOrders();
  }

  render() {
    if (this.state.data.length !== 0) {
      //declares variables needed to build out the table
      let table1 = [];
      let TblHead = [];
      let TblBody = [];
      let TblRow = [];

      var counter = 0;
      var PrevDate = "";
      var total = 0;

      //loops through and builds out the table
      {
        this.state.data.map((DataLine) => {
          //builds out date string into a Human readable format
          var d = new Date(DataLine.checkoutTime);
          var DateString = d.toString();
          var HumanReadDateSubStr = DateString.substring(4, 15);
          var TimeDateSubStr = DateString.substring(16, 21);
          var TimeOrdPlaced = HumanReadDateSubStr + " at " + TimeDateSubStr;

          if (PrevDate !== DataLine.checkoutTime && counter !== 0) {
            //creates totals
            TblRow.push(
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">${total}</TableCell>
              </TableRow>
            );
            //pushes out last row of previous data
            TblBody.push(<TableBody>{TblRow}</TableBody>);

            //pushes header and body to main page
            table1.push(
              <TableContainer component={Paper}>
                <Table aria-label="spanning table">
                  {TblHead}
                  {TblBody}
                </Table>
              </TableContainer>
            );

            //resets variables for new table
            TblHead = [];
            TblBody = [];
            TblRow = [];
            total = 0;
          }

          if (PrevDate !== DataLine.checkoutTime) {
            //builds out table header
            TblHead.push(
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p>Ordered: </p>
                    <p>
                      Name: {DataLine.firstName} {DataLine.lastName}{" "}
                    </p>
                    <p>Email: {DataLine.email}</p>
                    Order Placed on {TimeOrdPlaced}
                  </TableCell>
                  <TableCell>
                    <p>Billed to: </p>
                    <p> {DataLine.billingStrAddr} </p>
                    <p>
                      {" "}
                      {DataLine.billingCity} ,{DataLine.billingState}{" "}
                      {DataLine.billingZipCode}{" "}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p>Delivered to:</p>

                    <p>{DataLine.delivStrAddr} </p>

                    <p>
                      {DataLine.delivCity} ,{DataLine.delivState}{" "}
                      {DataLine.delivZipCode}
                    </p>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Product Name </TableCell>
                  <TableCell>Quantity </TableCell>
                  <TableCell>Price </TableCell>
                </TableRow>
              </TableHead>
            );
          }
          //ADDS TO BODY OF THE TABLE
          TblRow.push(
            <TableRow>
              <TableCell>{DataLine.name}</TableCell>
              <TableCell align="right">{DataLine.prodQty}</TableCell>
              <TableCell align="right">${DataLine.price}</TableCell>
            </TableRow>
          );
          total = total + DataLine.price * DataLine.prodQty;

          //keeps track of date to know when to build out a new table
          PrevDate = DataLine.checkoutTime;
          //KEEPS TRACK OF WHAT ROW its on
          counter = counter + 1;

          //builds out final table
          if (counter === this.state.data.length) {
            TblRow.push(
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">${total}</TableCell>
              </TableRow>
            );

            TblBody.push(<TableBody>{TblRow}</TableBody>);

            table1.push(
              <TableContainer component={Paper}>
                <Table aria-label="spanning table">
                  {TblHead}
                  {TblBody}
                </Table>
              </TableContainer>
            );

            //resets all variables
            TblHead = [];
            TblBody = [];
            TblRow = [];
            total = 0;
          }
        });
      }

      return (
        <div>
          <Fade top cascade>
            <h1> My Previous Orders</h1>

            {table1}
          </Fade>
        </div>
      );
    } else {
      return (
        <Fade top cascade>
          <h1>
            {" "}
            Something Went Wrong!?!? Please refresh the page. If this is your
            first time logging in, please place an order to see your order
            history{" "}
          </h1>
        </Fade>
      );
    }
  }
}
