import React from 'react';
import { Form, Button} from "react-bootstrap"; 
import Axios from 'axios';
import NumericInput from 'react-numeric-input';



export default class AddToCart extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            itemJustAdded : false 
        }          

    }
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

                    if (document.getElementById('NumInputstyle').value > 0) {
                        let SessionId = localStorage.getItem("SessionId")       
                        var Mydata = {};
                        var PostRequest = {SessionId: SessionId, ProdID: this.props.ProdId, ProdQTY: document.getElementById('NumInputstyle').value }
                        Mydata.Postdata = PostRequest      
                        let result = Axios.post("http://localhost:51129/api/cart", Mydata)
                        .then(  (response) =>  {
                            console.log(response);
                            localStorage.setItem("SessionId", response.data );
                            this.setState({itemJustAdded: true})
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