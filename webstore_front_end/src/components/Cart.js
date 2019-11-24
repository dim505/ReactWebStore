import React, {Component} from 'react';
import RemoveItem from './RemoveItem'
import Axios from 'axios'

export default class Cart extends Component {
    constructor(props) {
      super(props);
      this.handleItemRemoved = this.handleItemRemoved.bind(this);
        this.state = {
          items: [{id: -1, name: 'Test Product', prodQty: 0, price: 0}]
      }
  }


    async   componentDidMount() {

      await this.getCart()

      } ;

        async getCart() {

          if (localStorage.SessionId !== undefined ) {

            const URL = `http://localhost:51129/api/cart/${localStorage.SessionId}`
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


      async handleItemRemoved() {
         // console.log(props.id)
         
         await this.getCart()
          alert("test from cart ks");
        };


render() { 

  

  
          if (this.state.items[0].id === -1 || this.state.items.length === 0 ) {
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
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.prodQty}</td>
                    <td>{item.price}</td>
                    <td> <RemoveItem id={item.id} onItemRemoved={this.handleItemRemoved} /> </td>
                  </tr>
                ))}
                </tbody>
              </table>
            );


          }
        }
    
       




}