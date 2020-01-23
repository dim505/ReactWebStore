import React, {Component} from "react";
import NumericInput from 'react-numeric-input';
import Axios from 'axios'
import Snackbar from "@material-ui/core/Snackbar";
import Fade from 'react-reveal/Fade';

export default class UpdateQtyBtn   extends Component  {
    constructor(props) {
        super(props);
        this.state = {
                UpdateLinkClicked: false,
                SnackbarErrorPopup: false
        }

    }
 
 
    handleClick  = (e) => {
        e.preventDefault();

        this.setState({
            UpdateLinkClicked: true           
        })
        console.log('The link was clicked.');
}
    update = async (e) => {
        e.preventDefault();

        if (document.getElementById('NumInputstyle').value > 0){
            //declares emypt object 
            var Mydata = {};
            var UpdateData = { 
                qty: document.getElementById('NumInputstyle').value,
                ItmID: this.props.id,
                SessionID: localStorage.SessionId 
                }
                Mydata.UpdateData = UpdateData 
                console.log(Mydata)
                let result = await Axios.post("http://localhost:51129/api/cart/UpdateCart", Mydata)
                .then(  (result) =>  {
                    console.log(result);
                    
                    this.props.handleQtyUpdate();
                    this.setState({
                        UpdateLinkClicked: false
    
                    })
                    
        
        
                })  


        } else {


            this.setState({
                SnackbarErrorPopup: true
              })
  
  
              setTimeout(() =>             
              
              this.setState({
                SnackbarErrorPopup: false
              }), 3500  )



            
        }




       
    }

    cancel = async (e) => {


        e.preventDefault();
        this.setState({
            UpdateLinkClicked: false           
        })
    }




   render () {

    var UpdateLinkClicked = this.state.UpdateLinkClicked
    
    if (UpdateLinkClicked ) {

        return (
            <div> 
            
            <NumericInput
            id="NumInputstyle"
            strict={true}
            min={0}
            max={999}
            value={0}
            /> 
             <a className="UpdateQty" href="" onClick={this.update}>Update</a> 
             <a className="UpdateQty" href="" onClick={this.cancel}>Cancel</a>
             <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            key={{ vertical: "top", horizontal: "center" }}
            open={this.state.SnackbarErrorPopup}
            
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">Please Select a value greater than 0</span>}
          />
              
            
            </div>
        )


    } else {
        return (
            <div>

            <a className="UpdateQty" href="" onClick={this.handleClick}>Change Quantity</a>
            <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            key={{ vertical: "bottom", horizontal: "center" }}
            open={this.props.QtyUpdateNotifcationSnBar}
            
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">Item Quantity Updated</span>}
          />
            </div>
            )




    }



   }




    




}