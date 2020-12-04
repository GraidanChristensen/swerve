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
    this.getMyCart();
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


  //gets cart_id off sesion and sets it to redux state
  getMyCart = async () => {
    try{
      const id = await axios.get('/api/getmycart');
      this.props.getCart(id.data.cart_id);
      console.log(id.data.cart_id);

    }
    catch (err) {
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
  addToCart = async () => {
    // get size off state
    const cartParams = {size: this.state.selectedSize, cart_id: this.props.cart_id}
    // // axios call sending product id off url params
    const cart = await axios.post(`/api/addtocart/${this.props.match.params.productid}`, cartParams);
    // set cart_id onto redux
    console.log(cart.data[0].total_price);
    // this.props.getCart(cart.data[0].cart_id);

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
          <button onClick={this.addToCart}>Add to Cart</button>
          <h5>{this.state.description}</h5>
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