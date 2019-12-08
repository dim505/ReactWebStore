import React from "react"; 
import Axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class OrderSummary extends React.Component {

    state = {items: [{id: -1, name: 'Test Product', prodQty: 0, price: 0}], itemCount:1, total: 2.99}; 
    async componentDidMount() {
        if (localStorage.SessionId !== undefined ) {

            const URL = `https://webstorebackend.azurewebsites.net/api/cart/${localStorage.SessionId}`
            console.log(URL)
            var response = await Axios.get(URL)
            .then( (response) => {
    
  
              console.log(response)
  
               if ( response.data.length === 0 ) {
                        this.setState({
                          items: [{id: -1, name: 'Test Product', prodQty: 0, price: 0}]
                    })
  
               }   else {
  
                this.setState({
                  items:  response.data
            })               
  
               }
            }

            );
          }



    }

     getSum(total, num) {
        return total.price + num.price

    }



   

    render () {
        const Total = this.state.items.reduce(this.getSum,0)

        if ( this.state.items[0].id === -1 || this.state.items.length === 0  ) {
            return (
              <div className="CenterCart">
                <h1>
                  <i className="em em-dizzy_face" aria-label="DIZZY FACE" />
                  ....No items Found....
                  <i className="em em-dizzy_face" aria-label="DIZZY FACE" />
                </h1>

              </div>
            );


            

          } else {
            
            
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
                    Sub Total: $ {Total} <br />
                </div>
                ) 




          }








    }





}
