import React from 'react';


export default class Callback extends React.Component {
    


    async function () {
        //handles redirect to home page when a user logs in. Sometimes the component can render more than once thus needing the window.handleRedirectCallbackAlreadyCalled variable to prevent redirect again 
        if (window.location.search.includes("code=") && window.handleRedirectCallbackAlreadyCalled !== 1) {
             
			window.handleRedirectCallbackAlreadyCalled = 1
            
			//handles success and error responses from Auth0 after a user logs in (required per Auth0 API documentation to have this )
			await this.props.auth.handleRedirectCallback();
            //redirects to the home poage
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

