import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProdList extends Component {


    constructor(props) {
        super(props)
        this.state = {
            products: [

                { title: "Tuna", description: "canned Tuna", id: 1 },
                { title: "Milk", description: "Gal of Milk", id: 2 },
                { title: "Apples", description: "fruit", id: 3 }


            ]




        }




    }

    render() {
        return (
            <div className="row">

                {this.state.products.map(product =>
                    <div key={product.id} className="col-4">
                        <div className="card product-card">
                            <div className="card-body">
                                <h5 className="card-title"> {product.title}  </h5>
                                <p className="card-text">   {product.description}</p>
                                <Link to={`ProdDesc/${product.id}`}> Please click here for details </Link>

                            </div>

                        </div>

                    </div>
                )}
            </div>
        );
    }
}






