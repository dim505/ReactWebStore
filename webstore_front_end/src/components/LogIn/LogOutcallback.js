import React from 'react';


export default class LogOutcallback extends React.Component {








async componentDidMount() {

	//pushes back to home page after a user logs  out 
   setTimeout(() => {  this.props.history.push('/');  }, 4000);




}


render () {
return (
    <div className="CheckOutSecc">   

        <h1>Logout Successful 👍</h1>
        <h3>.......redirecting now......</h3> 
    </div>


);

}
}

