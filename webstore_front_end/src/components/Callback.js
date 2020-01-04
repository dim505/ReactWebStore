import React from 'react';


export default class Callback extends React.Component {
    


    async function () {
        
        if (window.location.search.includes("code=") && window.handleRedirectCallbackAlreadyCalled !== 1) {
            window.handleRedirectCallbackAlreadyCalled = 1
            await this.props.auth.handleRedirectCallback();
            
            setTimeout(() => {  this.props.history.push('/');  }, 4000);
          }

        

    } 
    async componentDidMount() {
        
      this.function()
        
 
        
      
    }


    render () {
        return (
            <div className="CheckOutSecc">   

                <h1>Authentication Successful 👍</h1>
               <h3>.......redirecting now......</h3> 
            </div>


        );

    }
}

