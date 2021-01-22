import React from "react";
import DefCustomerDetails from "./DefCustDet";
import DefBillAddr from "./DefBillAddr";
import Zoom from "react-reveal/Zoom";
import Snackbar from "@material-ui/core/Snackbar";
import DefDelivAddress from "./DefDelivAddr.js";
import axios from "axios";
import Tooltip from "../CheckOut/ToolTip";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class DefMainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      BillingSameAsDelivery: false,
      customer: {
        firstName: null,
        lastName: null,
        email: null,
        UseDefCustDetails: null,
      },
      billingAddress: {},
      deliveryAddress: {},
      paymentToken: {},
      SessionId: localStorage.SessionId,
      OpenBlankFieldErrNotifi: false,
      UseDefCustDetErrFlg: false,
      UseDefBillAddrErrFlg: false,
      UseDefDelivAddrErrFlg: false,
      UpdateSuccessfulNotifi: false,
      UpdateNotSuccessfulNotifi: false,
      DialogPopup: false,
    };
  }

  //updates customer details state as user types into the forms
  handleCustomerDetailsUpdated = (newDetails) => {
    this.setState({ customer: newDetails });
  };
  //updates Billing address state as user types into the forms
  handleBillingddressDetailsUpdated = (newDetails) => {
    this.setState({ billingAddress: newDetails });
  };

  //updates Delivery address state as user types into the forms
  handleDeliveryaddressDetailsUpdated = (newDetails) => {
    this.setState({ deliveryAddress: newDetails });
  };

  //when a user checks "use default delivery address at check out" checkbox, this tracks of the checkbox flag
  UseDefDelivAddr() {
    this.setState({ UseDefDelivAddr: !this.state.UseDefDelivAddr });
  }

  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }

  async DefCustomerDetailsSub() {
    if (
      !this.isEmpty(this.state.customer.firstName) &&
      !this.isEmpty(this.state.customer.lastName) &&
      !this.isEmpty(this.state.customer.email)
    ) {
      //gets token to present to backend API  from Auth0 to show this is a valid user
      const BearerToken = await this.props.auth.getTokenSilently();
      //builds out object to send along with Post request
      var Mydata = {};
      var DefCustDet = this.state.customer;
      Mydata.DefCustDet = DefCustDet;
      console.log(Mydata);
      //makes API post request
      axios
        .post(
          "http://localhost:51129/api/login/UpdatDefCustomerDetails",
          Mydata,

          {
            headers: { Authorization: `bearer ${BearerToken}` },
          }
        )
        .then(await this.setState({ UpdateSuccessfulNotifi: true }));
    } else {
      await this.setState({
        UseDefCustDetErrFlg: true,
        OpenBlankFieldErrNotifi: true,
      });
    }
  }
  async UseDefBillAddrSub() {
    if (
      !this.isEmpty(this.state.billingAddress.StreetAddress) &&
      !this.isEmpty(this.state.billingAddress.city) &&
      !this.isEmpty(this.state.billingAddress.State) &&
      !this.isEmpty(this.state.billingAddress.ZipCode) &&
      !this.isEmpty(this.state.billingAddress.country)
    ) {
      //gets token to present to backend API  from Auth0 to show this is a valid user
      const BearerToken = await this.props.auth.getTokenSilently();
      //builds out object to send along with Post request
      var Mydata = {};
      var DefBillAddr = this.state.billingAddress;
      Mydata.DefBillAddr = DefBillAddr;
      //makes API post request
      axios
        .post("http://localhost:51129/api/Login/UpdateDefBillAddr", Mydata, {
          headers: { Authorization: `bearer ${BearerToken}` },
        })
        .then(await this.setState({ UpdateSuccessfulNotifi: true }));
    } else {
      debugger;
      await this.setState({
        UseDefBillAddrErrFlg: true,
        OpenBlankFieldErrNotifi: true,
      });
    }
  }
  async UseDefDelivAddrSub() {
    if (
      !this.isEmpty(this.state.deliveryAddress.StreetAddress) &&
      !this.isEmpty(this.state.deliveryAddress.city) &&
      !this.isEmpty(this.state.deliveryAddress.State) &&
      !this.isEmpty(this.state.deliveryAddress.ZipCode) &&
      !this.isEmpty(this.state.deliveryAddress.country)
    ) {
      //gets token to present to backend API  from Auth0 to show this is a valid user
      const BearerToken = await this.props.auth.getTokenSilently();
      //builds out object to send along with Post request
      var MyData = {};
      var DefDelivAddr = this.state.deliveryAddress;
      MyData.DefDelivAddr = DefDelivAddr;
      //makes API post request
      axios
        .post("http://localhost:51129/api/Login/UpdateDefDelivAddr", MyData, {
          headers: { Authorization: `bearer ${BearerToken}` },
        })
        .then(await this.setState({ UpdateSuccessfulNotifi: true }));
    } else {
      await this.setState({
        UseDefDelivAddrErrFlg: true,
        OpenBlankFieldErrNotifi: true,
      });
    }
  }

  async OpenBlankFieldErrNotifiClose() {
    debugger;

    await this.setState({
      OpenBlankFieldErrNotifi: false,
    });
  }

  async UpdateSuccessfulNotifiClose() {
    debugger;

    await this.setState({
      UpdateSuccessfulNotifi: false,
    });
  }

  async CloseDialogPopup() {
    await this.setState({
      DialogPopup: false,
    });
  }

  OpenDialogPopup(id) {
    window.UpdateSectID = id;
    this.setState({
      DialogPopup: true,
    });
  }

  UpdateAcctDets(id) {
    this.setState({
      DialogPopup: false,
    });

    if (id === 1) {
      this.DefCustomerDetailsSub();
    } else if (id === 2) {
      this.UseDefBillAddrSub();
    } else if (id === 3) {
      this.UseDefDelivAddrSub();
    }
  }

  render() {
    const QuestIconStyle = {
      fontSize: "48px",
      color: "red",
    };
    return (
      <Zoom left>
        <div>
          <Dialog
            open={this.state.DialogPopup}
            onClose={() => this.CloseDialogPopup()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"!!! WARNING !!!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to Update?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.CloseDialogPopup()} color="primary">
                NO
              </Button>
              <Button
                onClick={() => this.UpdateAcctDets(window.UpdateSectID)}
                color="primary"
                autoFocus
              >
                YES
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={this.state.OpenBlankFieldErrNotifi}
            onClose={() => this.OpenBlankFieldErrNotifiClose()}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={
              <span id="message-id">Please Fill Out All The Forms In Red</span>
            }
          />

          <Snackbar
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={this.state.UpdateSuccessfulNotifi}
            onClose={() => this.UpdateSuccessfulNotifiClose()}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">Update Was Successful</span>}
          />

          <h2>
            Account Details
            <Tooltip
              placement="bottom"
              tooltip="Please fill out the your default account information. If you would like
        to use this information at checkout, please check the checkbox. 
        This will prefill any infomation you have saved here
         at your checkout window. This will reduce the need to input
        your information again"
            >
              <i className="fa fa-question-circle" style={QuestIconStyle}></i>
            </Tooltip>
          </h2>

          <DefCustomerDetails
            flag={this.state.UseDefCustDetErrFlg}
            onChanged={this.handleCustomerDetailsUpdated}
            auth={this.props.auth}
          />

          <Tooltip
            placement="top"
            tooltip="Please Remeber to Click Update when making ANY Account Changes!"
          >
            <Button
              onClick={() => this.OpenDialogPopup(1)}
              variant="outlined"
              color="secondary"
            >
              Click to Update
            </Button>
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
            <Button
              onClick={() => this.OpenDialogPopup(2)}
              variant="outlined"
              color="secondary"
            >
              Click to Update
            </Button>
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
            <Button
              onClick={() => this.OpenDialogPopup(3)}
              variant="outlined"
              color="secondary"
            >
              Click to Update
            </Button>
          </Tooltip>
        </div>
      </Zoom>
    );
  }
}
