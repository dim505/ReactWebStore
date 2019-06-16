import React, { Component } from 'react';



export default class ProdDesc extends Component {
    constructor(props) {

        super(props);
        this.state = { name: 'Product Name', description: 'product description', price: "Product Price"};





    }
    render() {




        return <div className="Row">
            <div className="col-12">
                <div className="media">
                    <img className="mr-3" style={{ width: 600, height: 600 }} src="https://images.carpages.ca/inventory/3154174.99875507?w=1280&h=960&q=75&fit=max&s=ac1985a51f127cc94e73e9be61154aed" alt=""/>
                    <div className="media-body">

                        <h1> {this.state.name} </h1>
                        <h3> {this.state.description} </h3>
                        <h5>{this.state.price} </h5>
                        


                            

                        </div>
               
                </div>
             </div>
            

        </div>


    }

   




}

