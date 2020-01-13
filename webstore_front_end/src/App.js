import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ProdList from './components/MainPage/ProdList';
import ProdDesc from './components/ProdDesc/ProdDesc';
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from './components/MainPage/NavBar';
import Fade from 'react-reveal/Fade';
import Loader from "react-loader-spinner";
import Axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Spinner from 'react-easy-spinner';
import Cart from './components/ShoppingCart/Cart'
import CheckOut from './components/CheckOut/CheckOutPage';
import Callback from './components/Callback'
import LogOutcallback from './components/LogOutcallback'
import SecureCheckOut from './components/SecureCheckOut'
import MyOrders from "./components/MyOrders"

export default class App extends React.Component {
 
//declares state
//      showSpinner: - determines whether to show preloader
//      showBody: determines whether to show body of website 
//     products: - get prepopulated with list of products filtered from search bar  
//      IntialProducts: - get prepopulated with  initial list of products 
//      ShowBrokenSite: false  - displays error if it cant make api call 
 constructor(props) {
    super(props);
    this.state = {
      showSpinner: true, 
      showBody: false, 
      products: [],
      IntialProducts: [],
      ShowBrokenSite: false,
      authenticated: false
    
    };
  }
  
  
 async GetAllProd () {
    
    var that = this;
	
    let results = 0
	//makes api call	
  	results = await Axios({
      
      
                  url:  'http://localhost:51129/api/productapi'
               
                  
                  
                  })
                    .then(

                      setTimeout( () => { 
						// if call is seccessful, it will overwrite value of 0 and proceed to set state 
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
					 //if it fails it will try to make another API call
                     .catch ( () => {


                      results =  Axios({  
                
                                  url:  'http://localhost:51129/api/productapi'
                              
                                  }) 
                                  
                                  .then(
									// if it succeeds it will set state
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
									   // if it fails, it will set the ShowBrokenSite flag so a broken site message will appear 
                                          this.setState ({
                                              ShowBrokenSite: true
                                          })
                                       )
                           }
                     )


  }

  async componentDidMount() {
       this.GetAllProd();
       this.isUserAuthenticated();
}


async isUserAuthenticated () {
    const isLoggedIn = await this.props.auth.isAuthenticated();
    await this.setState({ authenticated: isLoggedIn})
}

//function used to produce product filtered list 
filterList = (SearchTextBoxVal) => {
	  //makes a copy of the products list
      let products = this.state.IntialProducts
	  //returns all products that match the search phrase 
      products = products.filter ( 
          (product) => { return product.name.toLowerCase().search(SearchTextBoxVal.toString().toLowerCase()) !== -1}
        

      )
	  //sets state of products to be displayed 
      this.setState({products:products})
       



}
render () { 

	//defines settings for Edge Preloader, chrome preloader does not work with edge 
  let settings = {
    shape: "triangleUp",
    animation: "pulse",
    time: "2s",
    duration: 'infinite',
    opacity: '0.3',
    bgColor: '#27556c',
    elColor: '#2d1557'
  }

//if API call could not be made, it will show an error message 
if (this.state.ShowBrokenSite === true ) {
  return (<div> Cannot contact server, please try again later or refresh the page</div>)


} else {
//checks if browser is Edge 
    return (
      <div>
           { window.navigator.userAgent.indexOf("Edg") > 0 ?
                          <div className="center">
                          <Fade when={this.state.showSpinner}>
                          <Spinner {...settings}/>
                          </Fade>
                        </div> : 
                                  <div className="center">
                                  <Fade when={this.state.showSpinner}>
                                  <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                                  </Fade>
                                </div>
           }
            <Fade when={this.state.showBody}>
              <NaviBar 
              filterList={this.filterList}
              authenticated = {this.state.authenticated}
              auth={this.props.auth} />
              <Route exact path='/' component={() => <ProdList products = {this.state.products} /> } />
              <Route path="/ProdDesc/:id" component={ProdDesc} />
              <Route path="/cart" component={Cart}/>
              <Route path="/MyOrders" component={() =>  <MyOrders auth={this.props.auth}/>}/>
              <Route path="/callback" component={({...others}) => 
                      <Callback 
                      history={this.props.history}
                      auth={this.props.auth} {...others}/> 
              
              }/>
              <Route path="/LogOutcallback" component={LogOutcallback}/>
              <Route path="/CheckOut" component={({...others}) => 
              <SecureCheckOut auth={this.props.auth}> 
                      <CheckOut auth={this.props.auth} {...others}/> 
              </SecureCheckOut>
              }/>
            </Fade>
      </div>
          );
  }
     }

}



  



