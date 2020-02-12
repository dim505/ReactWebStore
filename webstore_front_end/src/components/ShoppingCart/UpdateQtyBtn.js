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
		//prevents the page from refreshing 
        e.preventDefault();
		//updating this state shows the NumericInput and update/cancel buttons 
        this.setState({
            UpdateLinkClicked: true           
        })
        console.log('The link was clicked.');
}
    update = async (e) => { 
		//prevents the page from refreshing 
        e.preventDefault();
		// deletes item if update QTy is greater than 0
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
               
				//makes api call to delete item
			   let result = await Axios.post("https://webstorebackend.azurewebsites.net/api/cart/UpdateCart", Mydata)
                .then(  (result) =>  {
                    console.log(result);
                    
                    this.props.handleQtyUpdate();
                    this.setState({
                        UpdateLinkClicked: false
    
                    })
                    
        
        
                })  


        } else {

			//notifies user they need qty greater than 0
            this.setState({
                SnackbarErrorPopup: true
              })
  
		//makes error notification go away
              setTimeout(() =>             
              
              this.setState({
                SnackbarErrorPopup: false
              }), 3500  )



            
        }




       
    }

    cancel = async (e) => {

	//prevents the page from refreshing 
        e.preventDefault();
		//changes component to the default state before button was pressed 
        this.setState({
            UpdateLinkClicked: false           
        })
    }




   render () {
	//if update link is clicked, the update will pop up 
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