import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

class Product extends Component{
  constructor(){
    super();
    
    this.state = {
      title: '',
      description: '',
      image: '',
      backImage: '',
      price: null,
      small: null,
      medium: null,
      large: null,
      xlarge: null,
      xxlarge: null,
      displayImage: ''
    }
  }

  componentDidMount(){
    this.getProduct();
    this.setState({
      displayImage: this.state.image
    })
  }

  getProduct = async () => {
    try{
      const product = await axios.get(`/api/product/${this.props.match.params.productid}`)
      this.setState({
        title: product.data[0].title,
        description: product.data[0].description,
        image: product.data[0].image,
        backImage: product.data[0].back_image,
        price: product.data[0].price,
        small: product.data[0].amount_small,
        medium: product.data[0].amount_medium,
        large: product.data[0].amount_large,
        xlarge: product.data[0].amount_xlarge,
        xxlarge: product.data[0].amount_xxlarge
      })
    }
    catch(err){
      console.log(err);
    }
  }

  render(){
    return(
      <div className='Product'>
          <Link className="backButton" to='/shop'><h5>Back</h5></Link>
          <h1>{this.state.title}</h1>
          <img alt='product' className='productImage' src={this.state.image}/>
          <div className="imageSelectors">
            <img alt='product' src={this.state.image}/>
            <img alt='product' src={this.state.backImage}/>
          </div>
          <h5>{this.state.price}</h5>
          <div className = "sizes">
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
          </div>
          <h5>{this.state.description}</h5>

          {console.log(this.state)}
      </div>
    )
  }
}

export default Product;