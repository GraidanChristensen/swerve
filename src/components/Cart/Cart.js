import React, {Component} from 'react';
import axios from 'axios';
import './Cart.css';
import {connect} from 'react-redux';
import {getCart} from '../../redux/reducer';
import {Link} from 'react-router-dom';

class Cart extends Component{
  constructor(){
    super();

    this.state= {
      cart: [],
      total: 0
    }
  }

  componentDidMount(){
    this.getMyCart();
    this.getCart();
    this.getTotalPrice();
  }

  //gets cart_id off sesion and sets it to redux state
  // if there is no session it creates one
  getMyCart = async () => {
    try{
      const id = await axios.get('/api/getmycart');
      this.props.getCart(id.data.cart_id);
    }
    catch (err) {
      console.log(err);
    }
  }


  //gets all the products in cart
  getCart = async () => {
    try{
      console.log("hit");
      const cart = await axios.get(`/api/cart/${this.props.cart_id}`);
      this.setState({
        cart: cart.data
      })
      this.getTotalPrice();
    }
    catch(err){
      console.log(err);
    }
  }

  //gets total price of all products in cart
  getTotalPrice = async () => {
    try{
      const total = await axios.get(`/api/carttotal/${this.props.cart_id}`);
      this.setState({
        total: total.data[0].sum
      })
    }
    catch(err){
      console.log(err);
    }
  }

  //removes item from cart
  deleteItem = async (cartref) => {
    try{
      await axios.delete(`/api/deleteitem/${cartref}`);
      this.getCart();
    }
    catch(err){
      console.log(err);
    }
  }

  render(){
    // maps over each product in the cart
    const mappedCart = this.state.cart.map((product, index) => {
      return (
        <div key={index} className="cartItem">
          <img alt="product" src={product.image}/>
          <div className="productInfo">
            <h3>{product.title}</h3>
            <p>size: {product.size}</p>
            <h5>{product.price}</h5>
            <button onClick={() => {this.deleteItem(product.cart_ref_id)}}>Remove</button>
          </div>
        </div>
      )
    })

    return(
      <div className='Cart'>
          <h1>Your Cart</h1>     
          {(this.state.cart[0]) ? mappedCart : <h2>Your cart is empty</h2>}
          <div className="subtotal">
            <h3>Subtotal:</h3>
            <h3>{this.state.total} USD</h3>
          </div>
          {(this.state.cart[0]) ? <Link to="/checkout"><button className="checkoutButton">CHECKOUT</button></Link> : null}
          <Link to="/shop"><button className="continueShopping">CONTINUE SHOPPING</button></Link>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    cart_id: state.cart_id
  }
}

export default connect(mapStateToProps, {getCart})(Cart);