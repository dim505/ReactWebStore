import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ProdList from './components/ProdList';
import ProdDesc from './components/ProdDesc';
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from './components/NavBar';
import Fade from 'react-reveal/Fade';
import Loader from "react-loader-spinner";
import Axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Spinner from 'react-easy-spinner';
import Cart from './components/Cart'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true, 
      showBody: false, 
      products: []};
  }
  
  

  async componentDidMount() {
    var that = this;
    let results = await Axios('https://webstorebackend.azurewebsites.net/api/productapi')
                    .then(

                      setTimeout( () => { 
                        
                        that.setState({ 
                          products: results.data,
                          showSpinner: false,
                          showBody: true})
                         }, 2000)
                         ).catch( that => {
                               Axios('https://webstorebackend.azurewebsites.net/api/productapi')
                               .then(
                                        setTimeout( () => { 
                                          that.setState({ 
                                            products: results.data,
                                            showSpinner: false,
                                            showBody: true})
                                          }, 2000)
                          )
                        });
      
       
    

}

render () { 

  let settings = {
    shape: "triangleUp",
    animation: "pulse",
    time: "2s",
    duration: 'infinite',
    opacity: '0.3',
    bgColor: '#27556c',
    elColor: '#2d1557'
  }

  
  if (window.navigator.userAgent.indexOf("Edg") > 0 ) {
    return (
      <div>
            
            <div className="center">
              <Fade when={this.state.showSpinner}>
              <Spinner {...settings}/>
              </Fade>
            </div>
    
            <Fade when={this.state.showBody}>
              <NaviBar />
              <Route exact path='/' component={() => <ProdList products = {this.state.products} /> } />
              <Route path="/ProdDesc/:id" component={ProdDesc} />
              <Route path="/cart" component={Cart}/>
            </Fade>
            
    
    
     
       
      </div>
          );



  } else {

    return (
      <div>
            
            <div className="center">
              <Fade when={this.state.showSpinner}>
              <Loader type="Puff" color="#00BFFF" height={100} width={100} />
              </Fade>
            </div>
    
            <Fade when={this.state.showBody}>
              <NaviBar />
              <Route exact path='/' component={() => <ProdList products = {this.state.products} /> } />
              <Route path="/ProdDesc/:id" component={ProdDesc} />
              <Route path="/cart" component={Cart}/>
              
            </Fade>
            
    
    
     
       
      </div>
          );


  }
  
  
  

     }

    


}

  

  



