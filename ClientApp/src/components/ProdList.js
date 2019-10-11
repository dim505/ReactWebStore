import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'

export default class ProdList extends Component {


    constructor(props) {
        super(props)
        this.state = {
            products: []




        };


    }


    async componentDidMount() {

        let results = await Axios('/api/Productapi')
       
           
        this.setState({ products: results.data})



    }


    render() {
        return (
            <div className="row">
                {this.state.products.map(product =>
                    

                    <div key={product.id} className="col-4">

                    <div className="card product-card">
                            <div className="card-body">
                            <h5 className="card-title"> {product.name}  </h5>
                                <p className="card-text">   {product.shortDesc}</p>
                            <Link to={`ProdDesc/${product.id}`}> Please click here for details </Link>
                
                        </div>
                
                        </div>
                    </div>
                    
                )}
            
            </div>
        );
    }
}






