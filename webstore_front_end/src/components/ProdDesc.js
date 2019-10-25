import React, { Component } from 'react';
import Axios from 'axios'
import { Row, Col} from "react-bootstrap";
import Spin from 'react-reveal/Spin';



export default class ProdDesc extends Component {
    constructor(props) {

        super(props);
        this.state = [];





    }



    async componentDidMount() {
        let results = await Axios(`https://localhost:44328/api/productapi/${this.props.match.params.id}`)
        
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
                        <Col>
                                <figure className="progressive">

                                    <img data-progressive={this.state.ImgLoc} src={this.state.ImgLocMin} className="mr-3 progressive__img progressive--not-loaded" alt=""/>
                                </figure>
                        </Col>

                        <Col>
                                <Spin>    
                                    <h3> {this.state.name} </h3>
                                    <h5> {this.state.description} </h5>
                                    <h6>Price: {this.state.price} </h6>
                                </Spin>
                        </Col>
               
                </Row>
                
            



    }

   




}

