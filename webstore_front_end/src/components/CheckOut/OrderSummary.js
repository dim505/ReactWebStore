import React from "react"; 
import Axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


//this component shows on the right when you check out. It has an order summary of your check out
export class OrderSummary extends React.Component {
	//setting intial state
    state = {items: [{id: -1, name: 'Test Product', prodQty: 0, price: 0}], itemCount:1, total: 2.99}; 
   
   
    async componentDidMount() {
       
		//on component mount, it checks if there is a session ID, if there is one, it will make a call to get the 
		//items for the particular cart 
	   if (localStorage.SessionId !== undefined ) {
			
			
			//builds URL string 
            const URL = `http://localhost:51129/api/cart/${localStorage.SessionId}`
             
			 //makes API call 
            var response = await Axios.get(URL)
            .then( (response) => {
    
  
               
			//if API call returns nothing, the state is set back to what it was orignally 
               if ( response.data.length === 0 ) {
                        this.setState({
                          items: [{id: -1, name: 'Test Product', prodQty: 0, price: 0}]
                    })
  
               }   else {
  
				//sets state with response 
                this.setState({
                  items:  response.data
                    })               
  
               }
			   //declares total variable 
               var Total = 0
			   
				//calculates the total for the order 
               this.state.items.map((item) => {Total = Total + (item.price * item.prodQty)  })
                 
				//sets the total for the order in state 
               this.setState({
                total:  Total
                  })  

            }

            );
          }



    }

 



   

    render () {

		//checks if the API call returns any results. If no, shows the first message else returns the list of items 
        if ( this.state.items[0].id === -1 || this.state.items.length === 0 ) {
            return (
              <div className="CenterCart">
                <h1>
                    Zoinks!..... No items found. Please add some items to your cart before proceeding...
                </h1>

              </div>
            );


            

          } 
		  
		  //else if returns the list of items from your cart 
		  else {
            
            
            return (
                <div> 
                    <h3>Your Order Summary </h3>
                    <Row> <Col> Product Name</Col> <Col> Quantity</Col> <Col> Price</Col> </Row>
                        {this.state.items.map( (item) => 
                        <Row>

                              <Col>
                              {item.name}
                              </Col>       
                              
                              <Col>
                              {item.prodQty} 
                              </Col> 

                                <Col>
                                {item.price}
                                </Col> 

                        </Row>
                          
                        ) }

                    
                    {this.state.items.length} items <br />
         
                    Sub Total: $ {this.state.total}  <br />
                </div>
                ) 




          }








    }





}
