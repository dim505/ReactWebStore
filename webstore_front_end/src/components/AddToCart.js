import React from 'react';
import { Form, Button} from "react-bootstrap"; 
import Axios from 'axios';
import NumericInput from 'react-numeric-input';


//component responsible for adding the item and quantity to cart 
export default class AddToCart extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
			//flag used to display the notification when an item is added to the cart
            itemJustAdded : false 
        }          

    }

    //defines the component for the product quantity 
    //<NumericInput/>


    render ()  {

        return (
            <div> 
				 
                <NumericInput
                id="NumInputstyle"
                strict={true}
                min={0}
                max={999}
                value={0}
                /> <br></br>

                    <Form onSubmit={(e) => {  
                    e.preventDefault();
					//only makes API call if quantity is greater than 0
                    if (document.getElementById('NumInputstyle').value > 0) {
						//gets the session ID
                        let SessionId = localStorage.getItem("SessionId")       
						 //declares object 
                        var Mydata = {};
						//populates the object with data 
                        var PostRequest = {SessionId: SessionId, ProdID: this.props.ProdId, ProdQTY: document.getElementById('NumInputstyle').value }
						//makes POST API request 	
                        Mydata.Postdata = PostRequest      
                        let result = Axios.post("https://webstorebackend.azurewebsites.net/api/cart", Mydata)
                        .then(  (response) =>  {
                            console.log(response);
							//overwrites session id with existing ID or writes a new one if one does not exist 
                            localStorage.setItem("SessionId", response.data );
							//sets flag to true to let user know that an item was added 
                            this.setState({itemJustAdded: true})
							//after a certain amount of time, the display goes away 
                            setTimeout(() => this.setState({itemJustAdded: false}), 6000   )
                        })
                        


                    } else {alert("Please Select a Quantity for the Product")} 

                    
                    
                
                } 
                

                
                }>      
                        { this.state.itemJustAdded ? <Button variant="secondary" type="submit" disabled>Add to Cart</Button> : <Button variant="outline-dark" type="submit">Add to Cart</Button> }  
                           
                    {this.state.itemJustAdded &&  <span className="alert alert-primary"> Item added to cart</span>}
                    </Form>
            </div>
    
    ) 



    } 

   

}