import React from 'react';
import { Link } from 'react-router-dom';
import Jump from 'react-reveal/Jump';






export default function ProdList (props) {

        return (      
        
            <div >  
                    
                    <div className="row">
                        {props.products.map(product =>
                    
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






