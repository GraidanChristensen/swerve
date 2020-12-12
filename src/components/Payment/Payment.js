import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {clearCart} from '../../redux/reducer';
import StripeCheckout from 'react-stripe-checkout';

import './Payment.css';

//this class gets the total price and customer from checkout page on mount
// handle payment method is called on place order button click

class Payment extends Component{
  constructor(){
    super();

    this.state={
      subTotal: 0,
      total: 0,
      email: "",
      customer_id: "",
      toggleButton: true
    }
  }

  // get subtotal from db
  componentDidMount(){
    this.getTotalPrice();
    this.getCustomer();
    this.setState({
      toggleButton: true
    })
  }
 
  //get customers email and customer_id and set it to state
  getCustomer = async () => {
    try{
      const customer = await axios.get(`/getcustomer/${this.props.cart_id}`);
      this.setState({
        email: customer.data[0].email,
        customer_id: customer.data[0].customer_id
      })
    }
    catch (err){
      console.log(err);
    }
  }

  //get total price 
  getTotalPrice = async () => {
    try{
      const total = await axios.get(`/api/carttotal/${this.props.cart_id}`);
      this.setState({
        subTotal: total.data[0].sum,
        total: Math.round((+total.data[0].sum + 6.00 + Number.EPSILON) * 100) / 100
      })
    }
    catch(err){
      console.log(err);
    }
  }

  // axios call to stripe endpoint to handle payment
  makePayment = token => {
    const body = {
      token,
      price: (this.state.total * 100),
      id: this.state.customer_id
    }
    axios.post('/api/payment', body)
    .then(res => {
      const {status} = res;
      console.log(status);
      this.handleConfirmation();
    })
    .catch (err => console.log(err))
  }


  // makes a request to email to send confirmation email 
  // adds an order to db passing cart_id and customer_id
  //subtracts from stock of product
  // clears cart
  //sends to the confirmation page passing the order id with
  handleConfirmation = async () =>{
    try{
      this.setState({
        toggleButton: false
      })
      await axios.post('/email', {email: this.state.email}) // nodemailer
      const order = await axios.post('/api/addorder', {cart_id: this.props.cart_id, customer_id: this.state.customer_id}); //creates order
      await axios.put(`/admin/fixinventory/${this.props.cart_id}`) //subtracts products from inventory
      this.props.clearCart(); // clears cart on front end
      await axios.post('/clearcart'); //clears cart session on backend 
      this.props.history.push(`/confirmation/${order.data[0].order_id}`);
    }
    catch (err){
      console.log(err);
    }
  }

  //CardElement is the card input field
  render(){
    return(
      <div className='Payment'>
        <Link className="paymentToCart" to='/cart'>Back to Cart</Link>
        <h1>Payment</h1>
        <div className="pricing">
          <h3>Subtotal: ${this.state.subTotal} USD</h3>
          <h3>Shipping: flat rate $6.00 USD</h3>
          <h3>Total: ${this.state.total} USD</h3>
        </div>
          <StripeCheckout stripeKey={'pk_test_51HwxW7Klb5Fyw3QKLdAdUKTjPCwDLUK2JrrpO5FMeXw3oCWv6dBaUg1TewhFGFCzp4o2IkZBeDNDDz6Aospt3R0l00DgbiyqcS'} token={this.makePayment} amount={this.state.total * 100} name="Swerve">
            <button className={this.state.toggleButton ? "confirmOrder" : "hideConfirm"}>Purchase</button>
          </StripeCheckout>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    cart_id: state.cart_id
  }
}

export default connect(mapStateToProps, {clearCart})(Payment);