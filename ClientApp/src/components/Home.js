import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            products: [
                { title: "Honda Civic DX", description: "interesting" },
                { title: "Honda Civic LX", description: "more" },
                { title: "Honda Civic EX", description: "more" },
                { title: "Honda Civic SI", description: "more" }

            ]
        };
    }

    render() {
        return (
            <div className="row">
                {this.state.products.map(product =>
                    <div className="col-4">
                        <div className="card product-card">
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
