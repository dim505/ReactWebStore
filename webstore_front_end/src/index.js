import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import createAuth0Client from '@auth0/auth0-spa-js'

const auth0 = async () => await createAuth0Client({
    domain : 'dev-5wttvoce.auth0.com',
    client_id: 'TnRQQdDDNDbNXtygmUDwaxYtAdueTpU1',
    //REDIRECT URl WHEN AUTHENTICATION SECEEEDS
    redirect_uri: 'http://localhost:3000/callback'


});


auth0().then(auth => {
    ReactDOM.render(
        <BrowserRouter basename='/'>
            <App auth = {auth}/>
        </BrowserRouter>,
        document.getElementById('root'));


})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
