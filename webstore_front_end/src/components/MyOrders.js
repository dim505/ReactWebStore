import React from 'react';
import Axios from 'axios';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//this Component will contain the button that will submit the order to the backend 
export default  class MyOrders extends React.Component {
    state = {
        data: []

    }

  
   GetHistoricalOrders = async () => {

    const BearerToken = await this.props.auth.getTokenSilently();
    
    var results = await  Axios.get ('http://localhost:51129/api/login',                           
    {
            headers: {'Authorization': `bearer ${BearerToken}`}
    
    }
        ).then ( (results) => {
             this.setState ({
                data: results.data
              })     
              
              console.log(results)


        } 

        )

        
}
componentDidMount () {
    this.GetHistoricalOrders();

}

    render () {

      if (this.state.data.length !== 0 ) {

        return (
          <div>
              <h1> My Previous Orders</h1>

              
    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>
              <p>Ordered:  </p>
              
             <p>Name:  {this.state.data[0].firstName} {this.state.data[0].lastName} </p>
              <p>Email: {this.state.data[0].email}</p>
             Order Placed: {this.state.data[0].checkoutTime} 
              
            </TableCell>
            <TableCell>
              <p>Billed to: </p> 
              <p> {this.state.data[0].billingStrAddr} </p>
               <p> {this.state.data[0].billingCity}{" "},
                {this.state.data[0].billingState}{" "}
                {this.state.data[0].billingZipCode} </p>

            </TableCell>
            <TableCell>
             <p>Delivered to:</p>  

              <p>{this.state.data[0].delivStrAddr} </p>
              
              <p>{this.state.data[0].delivCity}{" "},
                {this.state.data[0].delivState}{" "}
                {this.state.data[0].delivZipCode}
                </p>  

            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Product Name </TableCell>
            <TableCell>Quantity </TableCell>
            <TableCell>Price </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.data.map(item => (
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">{item.prodQty}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{this.state.total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
          </div>
      )


      } else {

        return (

          <h1> Something Went Wrong!?!? Please refresh the page. If this is your first time logging in, please place an order to see your order history </h1>

        )

        
      }

      
 




        



    }

}