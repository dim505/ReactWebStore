import React from 'react';
import { Button } from 'react-bootstrap';
import Axios from 'axios'

export default function RemoveItem (props) { 
        
    
    
    async function submit() {

        await Axios.delete(`http://localhost:51129/api/cart/${localStorage.SessionId}/lines/${props.id}`);
        props.onItemRemoved();

    };
    
    
    
    
    return (


      
                <Button className="btn btn-danger" onClick={submit}>

                Remove Item



                </Button>   


               


        );




}