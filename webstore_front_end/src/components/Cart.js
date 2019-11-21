import React, {Component} from 'react';
import Image from 'react-bootstrap/Image'
import Axios from 'axios'

export default class Cart extends Component {
    state = {}
    constructor(props) {
      super(props);
        this.state = {
          items: [{ID: -1, name: 'Test Product', prodQty: 0, price: 0}]
      }
  }


    async   componentDidMount() {

      if (localStorage.SessionId !== undefined ) {

        const URL = `https://webstorebackend.azurewebsites.net/api/cart/${localStorage.SessionId}`
        console.log(URL)
        var response = await Axios.get(URL)
        .then( (response) => {

          console.log(response)
                      this.setState({
         
          items:  response.data
        })

        }


        
        );
      }

      } 




render() { 

  

  
          if (this.state.items[0].ID === -1 ) {
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
                  <tr key={item.ID}>
                    <td>{item.name}</td>
                    <td>{item.prodQty}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            );


          }
        }
    
       




}