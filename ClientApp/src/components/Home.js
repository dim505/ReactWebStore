import React, { Component } from 'react';

export class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [

                { title: "Tuna", description: "canned Tuna" },
                { title: "Milk", description: "Gal of Milk" },
                { title: "Apples", description: "fruit"}


            ]




        }




    }

    render() {
        return (
            <div className="row">

                {this.state.products.map(product => 
                <div className="col-4">
                    <div className="card product-card">
                        <div className="card-body">
                                <h5 className="card-title"> {product.title}  </h5>
                                <p className="card-text">   {product.description}</p>  


                        </div>

                    </div>

                </div>
                )}
            </div>
        );
    }
}
