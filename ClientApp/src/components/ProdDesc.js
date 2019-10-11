import React, { Component } from 'react';
import Axios from 'axios'




export default class ProdDesc extends Component {
    constructor(props) {

        super(props);
        this.state = [];





    }



    async componentDidMount() {
        let results = await Axios(`/api/Productapi/${this.props.match.params.id}`)
        
        this.setState({
            name: results.data[0].name,
            description: results.data[0].longDesc,
            price: results.data[0].price,
            ImgLoc: results.data[0].imgPath


        })


    }
    render() {

        
            window.progressively.init();
        



        return <div className="Row">
            <div className="col-12">
                <div className="media">

                    <figure className="progressive">

                        <img data-progressive={this.state.ImgLoc} src={this.state.ImgLoc} className="mr-3 progressive__img progressive--not-loaded" style={{ width: 600, height: 600 }} alt=""/>
                    </figure>


                    <div className="media-body">

                        <h1> {this.state.name} </h1>
                        <h3> {this.state.description} </h3>
                        <h5>Price: {this.state.price} </h5>
                        


                            

                        </div>
               
                </div>
             </div>
            

        </div>


    }

   




}

