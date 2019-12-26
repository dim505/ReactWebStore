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
import CheckOut from './components/CheckOut';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true, 
      showBody: false, 
      products: [],
      IntialProducts: [],
      ShowBrokenSite: false 
    
    };
  }
  
  

  async componentDidMount() {
    var that = this;
    let results = 0
     results = await Axios({
      
      
                  url:  'https://webstorebackend.azurewebsites.net/api/productapi'
               
                  
                  
                  })
                    .then(

                      setTimeout( () => { 
                         if (results !== 0) {
                          that.setState({ 
                            IntialProducts: results.data,
                            products: results.data,
                            showSpinner: false,
                            showBody: true})


                         } else {

                              

                         }

                         }, 2000)
                         )
                     .catch ( () => {


                      results =  Axios({  
                
                                  url:  'https://webstorebackend.azurewebsites.net/api/productapi'
                              
                                  }) 
                                  
                                  .then(
                                
                                    setTimeout( () => { 
                                      
                                      if (results !== undefined) {
                                        that.setState({ 
                                          IntialProducts: results.data,
                                          products: results.data,
                                          showSpinner: false,
                                          showBody: true})
              
              
                                       } else {
              
                                            
              
                                       }


                                       }, 2000)

                                       
                                       )
                                       .catch (
                                          this.setState ({
                                              ShowBrokenSite: true


                                          })


                                       )





                           }







                     )
      
       
    

}


filterList = (SearchTextBoxVal) => {
      let products = this.state.IntialProducts
      products = products.filter ( 
          (product) => { return product.name.toLowerCase().search(SearchTextBoxVal.toString().toLowerCase()) !== -1}
        

      )
      this.setState({products:products})
       



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


if (this.state.ShowBrokenSite === true ) {
  return (<div> Cannot contact server, please try again later or refresh the page</div>)


} else {


  if (window.navigator.userAgent.indexOf("Edg") > 0 ) {
    return (
      <div>
            
            <div className="center">
              <Fade when={this.state.showSpinner}>
              <Spinner {...settings}/>
              </Fade>
            </div>
    
            <Fade when={this.state.showBody}>
              <NaviBar filterList={this.filterList}/>
              <Route exact path='/' component={() => <ProdList products = {this.state.products} /> } />
              <Route path="/ProdDesc/:id" component={ProdDesc} />
              <Route path="/cart" component={Cart}/>
              <Route path="/CheckOut" component={CheckOut}/>
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
              <NaviBar filterList={this.filterList}/>
              <Route exact path='/' component={() => <ProdList products = {this.state.products} /> } />
              <Route path="/ProdDesc/:id" component={ProdDesc} />
              <Route path="/cart" component={Cart}/>
              <Route path="/CheckOut" component={CheckOut}/>
            </Fade>
            
    
    
     
       
      </div>
          );


  }
  
  
  

     }

    


}




}
  


  

  



