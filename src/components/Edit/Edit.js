import axios from 'axios';
import React, {Component} from 'react';

import './Edit.css';
class Edit extends Component{
    constructor(){
        super();

        this.state = {
            product: null
        }
    }

componentDidMount(){
    this.getProduct();
}

getProduct = async () => {
    try{
        const product = await axios.get(`/api/product/${this.props.match.params.productid}`)
        this.setState({
            product: product.data[0]
        })
    }
    catch(err){
        console.log(err);
    }
}

  render(){
    return(
      <div className='Edit'>
          <h1>Edit</h1>
          {console.log(this.state.product)}
      </div>
    )
  }
}

export default Edit;