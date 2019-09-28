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
            name: results.data.name,
            description: results.data.desc,
            price: results.data.price


        })


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

