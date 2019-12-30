import React from 'react';
import { FormControl, Form, Button} from "react-bootstrap";

//this component contains the search bar used to search products on the nav bar 
export default class SearchBar extends React.Component {
 


render () {
    return (

        <Form inline>
        <FormControl id="search" type="text" placeholder="Search Products" className="mr-sm-2" />
        <Button variant="outline-success" onClick={() => this.props.filterList(document.getElementById("search").value)}>Search</Button>
      </Form>

    )



}
}