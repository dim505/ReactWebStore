import React from 'react';
import { Form, Button} from "react-bootstrap"; 
import Axios from 'axios';
import NumericInput from 'react-numeric-input';



export default class AddToCart extends React.Component {


    render ()  {

        return ( <Form onSubmit={(e) => {  
            e.preventDefault();
            let SessionId = localStorage.getItem("SessionId") 
            let result = Axios.post("http://localhost:51129/api/cart", {SessionId: SessionId, ProdID: this.props.ProdId, ProdQTY: 1})
            .then(function (response) {
                console.log(response);
                localStorage.setItem("SessionId", response.data );
              })
            
            
          
        } 
        

        
        }>

                    <Button variant="outline-dark" type="submit">Add to Cart</Button>

                    <NumericInput className="form-control"/>

            </Form>
    
    
    ) 



    } 

   

}