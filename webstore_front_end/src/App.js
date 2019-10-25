import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ProdList from './components/ProdList';
import ProdDesc from './components/ProdDesc';
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from './components/NavBar';
import Footer from './components/Footer';
import Fade from 'react-reveal/Fade';
import Loader from "react-loader-spinner";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showSpinner: true, showBody: false };
  }
  
  
  
  render() {
    setTimeout(() => {
      this.setState({
        showSpinner: false,
        showBody: true
      });
    }, 5000);

    return (
  <div>
        
        <div className="center">
          <Fade when={this.state.showSpinner}>
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </Fade>
        </div>

        <Fade when={this.state.showBody}>
          <NaviBar />
          <Route exact path='/' component={ProdList} />
          <Route path="/ProdDesc/:id" component={ProdDesc} />
          <Footer />
        </Fade>
        


 
   
  </div>
      );
    }
}


