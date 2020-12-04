import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getCart} from '../../redux/reducer';

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
        xxlarge: product.data[0].amount_xxlarge,
        displayImage: product.data[0].image,
        selectedSize: 'small'
      })
    }
    catch(err){
      console.log(err);
    }
  }

  //sets state value for slected size to be whatever user
  //selects on drop down menu
  handleSize = (e) => {
    this.setState({
      selectedSize: e.target.options[e.target.selectedIndex].value
    })
  }

  // handles the add to cart button
  //axios call to add product to cart
  addToCart = () => {
    
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

          <select onClick={e => this.handleSize(e)} name="sizes" id="sizes">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xlarge">X Large</option>
            <option value="xxlarge">XX Large</option>
          </select>
          <button>Add to Cart</button>
          <h5>{this.state.description}</h5>
          {console.log(this.props.cart_id)}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    cart_id: state.cart_id
  }
}

export default connect(mapStateToProps, {getCart})(Product);