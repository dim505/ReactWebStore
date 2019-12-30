import React from 'react';


export default class Callback extends React.Component {

    async componentDidMount() {
        await this.props.handleRedirectCallback; 
      
        this.props.history.push('/');
      
    }


    render () {
        return (
            <div>   

                <p>Success</p>
                You are now authenticated 
            </div>


        );

    }
}

