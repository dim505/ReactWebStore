import React, { Component } from 'react';
import Axios from 'axios'
import { Row, Col} from "react-bootstrap";
import Spin from 'react-reveal/Spin';
import Image from 'react-bootstrap/Image'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import AddToCart from './AddToCart'


export default class ProdDesc extends Component {
    constructor(props) {

        super(props);
        this.state = {
            name : '0',
            description : '0',
            price : '0',
            ImgLoc : '0',
            ImgLocMin : '0' 


        }          

    }



    async componentDidMount() {
        let results = await Axios(`https://webstorebackend.azurewebsites.net/api/productapi/${this.props.match.params.id}`)
        
        this.setState({
            name: results.data[0].name,
            description: results.data[0].longDesc,
            price: results.data[0].price,
            ImgLoc: results.data[0].imgPath,
            ImgLocMin: results.data[0].imgPathMin


        })


    }
    render() {

        
            
        

        window.progressively.init();

        return   <Row>
                        <Col sm={6}>
                        <ResponsiveEmbed aspectRatio="4by3">

                                <figure className="progressive">

                                    <Image  data-progressive={this.state.ImgLoc} src={this.state.ImgLocMin} className="mr-3 progressive__img progressive--not-loaded" alt="" rounded />
                                </figure>
                        </ResponsiveEmbed>
                        </Col>

                        <Col sm={6
                        }>
                                <Spin>    
                                    <h3> {this.state.name} </h3>
                                    <h5> {this.state.description} </h5>
                                    <h6>Price: {this.state.price} </h6>
                                    <AddToCart  ProdId = {this.props.match.params.id} />
                                </Spin>
                        </Col>
               
                </Row>
                
            



    }

   




}

