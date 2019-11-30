import React from 'react';
import {Row, Col} from 'react-bootstrap'
import {OrderSummary} from '../OrderSummary'
import CheckOutSummary from './CheckOutSummary'

export default class CheckOut extends React.Component{
    render () {
        return (
               <Row> 
                    <Col md={8}>

                        <CheckOutSummary /> 
                    </Col>

                    <Col md={4}>
                             <OrderSummary />

                    </Col>

               </Row>

            
        );



    }



}