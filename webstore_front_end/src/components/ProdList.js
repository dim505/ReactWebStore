import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Jump from 'react-reveal/Jump';






export default class ProdList extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            products: []




        };


    }


    async componentDidMount() {

        let results = await Axios('https://localhost:44328/api/productapi')
       
           
        this.setState({ products: results.data})



    }


    render() {
        return (      
        
            <div >  
                    
                    <div className="row">
                        {this.state.products.map(product =>
                    
                    <Jump>
                            <div key={product.id} className="col-4">

                            <div className="card product-card">
                                    <div className="card-body">
                                    <h5 className="card-title"> {product.name}  </h5>
                                        <p className="card-text">   {product.shortDesc}</p>
                                    <Link to={`ProdDesc/${product.id}`}> Please click here for details </Link>
                
                                </div>
                
                                </div>
                            </div>
                        </Jump>
                   
                )}
            
                        </div>
                    </div> 



        );
    }
}






