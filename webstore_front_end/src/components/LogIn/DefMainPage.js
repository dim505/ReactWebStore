import React, { Component } from "react";
import DefCustomerDetails from "./DefCustDet";
import DefBillAddr from "./DefBillAddr";
import Zoom from 'react-reveal/Zoom';
import Snackbar from "@material-ui/core/Snackbar";
import DefDelivAddress from "./DefDelivAddr.js";
import axios from "axios";
import Tooltip from "../CheckOut/ToolTip";      



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      BillingSameAsDelivery: false,
      customer: {},
      billingAddress: {},
      deliveryAddress: {},
      paymentToken: {},
      SessionId: localStorage.SessionId,
      OpenBlankFieldErrNotifi: false,
      UseDefCustDetErrFlg: false,
      UseDefBillAddrErrFlg: false,
      UseDefDelivAddrErrFlg: false
    };
  }


  //updates customer details state as user types into the forms 
  handleCustomerDetailsUpdated = newDetails => {
    this.setState({ customer: newDetails });
  };
  //updates Billing address state as user types into the forms 
  handleBillingddressDetailsUpdated = newDetails => {
      debugger;
    this.setState({ billingAddress: newDetails });


  };
	
   //updates Delivery address state as user types into the forms 
  handleDeliveryaddressDetailsUpdated = newDetails => {
    debugger;
    this.setState({ deliveryAddress: newDetails });
  };


 
  //when a user checks "use default delivery address at check out" checkbox, this tracks of the checkbox flag  
  UseDefDelivAddr() {
    this.setState({ UseDefDelivAddr: !this.state.UseDefDelivAddr });
    
  }

  async DefCustomerDetailsSub() {


    if ( !this.isEmpty(this.state.customer.firstName) && 
    !this.isEmpty(this.state.customer.lastName) && 
    !this.isEmpty(this.state.customer.email) && 
    !this.isEmpty(this.state.customer.UseDefCustDetails))
    
    {
            //gets token to present to backend API  from Auth0 to show this is a valid user
    const BearerToken = await this.props.auth.getTokenSilently();
    //builds out object to send along with Post request 
      var Mydata = {};
      var DefCustDet = this.state.customer; 
      Mydata.DefCustDet = DefCustDet;
      console.log(Mydata)
    //makes API post request 
      axios.post("http://localhost:51129/api/login/UpdatDefCustomerDetails", Mydata
      
      ,
      {
          headers: {'Authorization': `bearer ${BearerToken}`}
  
      }
      
  
      
      ).then();



    } else {

      debugger;
      await this.setState({
        UseDefCustDetErrFlg: true,
        OpenBlankFieldErrNotifi: true
      });
  
      setInterval(() => this.setState({ OpenBlankFieldErrNotifi: false }), 6000);
      



    }

    

  }
  async UseDefBillAddrSub() {
    //gets token to present to backend API  from Auth0 to show this is a valid user
    const BearerToken = await this.props.auth.getTokenSilently()
	//builds out object to send along with Post request 
    var Mydata = {};
    var DefBillAddr = this.state.billingAddress;
    Mydata.DefBillAddr = DefBillAddr;
	//makes API post request 
    axios.post("http://localhost:51129/api/Login/UpdateDefBillAddr", Mydata,
    {

      
          headers: {'Authorization': `bearer ${BearerToken}`}
    }
    
    
    ).then(results => {
      console.log(results);
      console.log(results.data);
    });

    debugger;
    await this.setState({
      UseDefBillAddrErrFlg: true,
      OpenBlankFieldErrNotifi: true
    });

    setInterval(() => this.setState({ OpenBlankFieldErrNotifi: false }), 6000);
  }
  async UseDefDelivAddrSub() {
	 //gets token to present to backend API  from Auth0 to show this is a valid user
    const BearerToken = await this.props.auth.getTokenSilently()
	//builds out object to send along with Post request 
    var MyData = {};
    var DefDelivAddr = this.state.deliveryAddress;
    MyData.DefDelivAddr = DefDelivAddr;
	//makes API post request 
    axios.post("http://localhost:51129/api/Login/UpdateDefDelivAddr", MyData,
    {
      headers: {'Authorization': `bearer ${BearerToken}`}
    }
    
    ).then(results => {
      console.log(results);
      console.log(results.data);
    });

    debugger;
    await this.setState({
      UseDefDelivAddrErrFlg: true,
      OpenBlankFieldErrNotifi: true
    });

    setInterval(() => this.setState({ OpenBlankFieldErrNotifi: false }), 6000);
  }



  handleClose() {
    debugger;

    this.setState({
      OpenBlankFieldErrNotifi: false
    });
  }

  render() {
    return (
      <Zoom left>
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.open}
          onClose={() => this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">Please Fill Out All The Forms In Red</span>
          }
        />

        <h2>Account Details </h2>
        <DefCustomerDetails
          flag={this.state.UseDefCustDetErrFlg}
          onChanged={this.handleCustomerDetailsUpdated}

          auth={this.props.auth}
        />



        
       <Tooltip
        placement="top"
        tooltip="Please Remeber to Click Update when making ANY Account Changes!"
                              >

          <button onClick={() => this.DefCustomerDetailsSub()} > Click to Update </button>  

        </Tooltip>

        
        <DefBillAddr
          flag={this.state.UseDefBillAddrErrFlg}
          onChanged={this.handleBillingddressDetailsUpdated}
          auth={this.props.auth}
        />


               <Tooltip
        placement="top"
        tooltip="Please Remeber to Click Update when making ANY Account Changes!"
                              >
        <button onClick={() => this.UseDefBillAddrSub()}>
          {" "}
          Click to Update{" "}
        </button>
        </Tooltip>
        
        <DefDelivAddress
          flag={this.state.UseDefDelivAddrErrFlg}
          onChanged={this.handleDeliveryaddressDetailsUpdated}
          auth={this.props.auth}
        />


        <Tooltip
        placement="top"
        tooltip="Please Remeber to Click Update when making ANY Account Changes!"
                              >
        <button onClick={() => this.UseDefDelivAddrSub()}>
          {" "}
          Click to Update{" "}
        </button>
        </Tooltip>
      </div>
      </Zoom>
    );
  }
}

export default App;
