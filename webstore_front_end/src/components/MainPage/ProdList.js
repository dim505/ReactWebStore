import React from 'react';
import { Link } from 'react-router-dom';
import Jump from 'react-reveal/Jump';
import LightSpeed from 'react-reveal/LightSpeed';




//this component builds out the product list used to display the products on the main page 
export default function ProdList (props) {
//returns the items that fits the criteria else it returns no items found 
        return (      
        



       <div>
            {props.products.length ? (
            <div>
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
          ) : (
            <LightSpeed right>
            <div className="CenterCart">
              <h1>
                <i className="em em-dizzy_face" aria-label="DIZZY FACE" />
                ....Search Found No items....
                <i className="em em-dizzy_face" aria-label="DIZZY FACE" />
              </h1>

            </div>
            </LightSpeed>
          )}

        </div>



                   








        );
    
}






