import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './Checkout.css';

//tomorrow
//get checkout info saved to db 
//pass in cart_id from redux on axios request
//set customer_id on cart db to the new customer on back end



class Checkout extends Component{
  constructor(){
    super();

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      country: "United States",
      state: "",
      postalCode: "",
      phone: "",
      toggleError: false
    }
  }

  //handles input changes
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  //handles country drop down
  handleCountry = (e) => {
    this.setState({
      country: e.target.options[e.target.selectedIndex].value
    })
  }


  //checks for required inputs. if all required is filled out
  //adds info to customer db w axios request then sends to payment page
  handleSubmit = async (e) => {
    e.preventDefault();

    if(!this.state.email){
      this.setState({
        toggleError: true
      })
    }

    else if(!this.state.firstName){
      this.setState({
        toggleError: true
      })
    }

    else if(!this.state.lastName){
      this.setState({
        toggleError: true
      })
    }

    else if(!this.state.address){
      this.setState({
        toggleError: true
      })
    }

    else if(!this.state.city){
      this.setState({
        toggleError: true
      })
    }

    else if(!this.state.state){
      this.setState({
        toggleError: true
      })
    }

    else if(!this.state.postalCode){
      this.setState({
        toggleError: true
      })
    }

    else{
      const {email, firstName, lastName, address, apartment, city, country, state, postalCode, phone} = this.state;
      this.setState({
        toggleError: false
      })
      await  axios.post(`/api/addcustomer/${this.props.cart_id}`, {email, firstName, lastName, address, apartment, city, country, state, postalCode, phone});
      this.props.history.push('/payment');
 
    }
  }

  render(){
    return(
      <div className='Checkout'>
        <Link className="backToCart" to='/cart'>Back to Cart</Link>
        <form>
          <h3>Contact Information</h3>
          <div className="formGroup">
            <h5>Email</h5>
            <input type="text" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={e => this.handleChange(e)} />
          </div>
          
          <h3>Shipping Address</h3>
          <div className="formGroup">
            <h5>First name</h5>
            <input type="text" className="form-control" name="firstName" placeholder="First name" value={this.state.firstName} onChange={e => this.handleChange(e)} />
          </div>

          <div className="formGroup">
            <h5>Last name</h5>
            <input type="text" className="form-control" name="lastName" placeholder="Last name" value={this.state.lastName} onChange={e => this.handleChange(e)} />
          </div>

          <div className="formGroup">
            <h5>Address</h5>
            <input type="text" className="form-control" name="address" placeholder="Address" value={this.state.address} onChange={e => this.handleChange(e)} />
          </div>

          <div className="formGroup">
            <h5>Apartment, suite, etc. (optional)</h5>
            <input type="text" className="form-control" name="apartment" placeholder="Apartment, suite, etc. (optional)" value={this.state.apartment} onChange={e => this.handleChange(e)} />
          </div>
          
          <div className="formGroup">
            <h5>City</h5>
            <input type="text" className="form-control" name="city" placeholder="City" value={this.state.city} onChange={e => this.handleChange(e)} />
          </div>

          <div className="formGroup">
          <h5>Country</h5>
          <select onClick={e => this.handleCountry(e)} name="country" id="country">
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
          </select>
          </div>

          <div className="formGroup">
            <h5>State/Province</h5>
            <input type="text" className="form-control" name="state" placeholder="State/Province" value={this.state.state} onChange={e => this.handleChange(e)} />
          </div>

          <div className="formGroup">
            <h5>Postal Code</h5>
            <input type="text" className="form-control" name="postalCode" placeholder="Postal Code" value={this.state.postalCode} onChange={e => this.handleChange(e)} />
          </div>

          <div className="formGroup">
            <h5>Phone (optional)</h5>
            <input type="tel" className="form-control" name="phone" placeholder="Phone" value={this.state.phone} onChange={e => this.handleChange(e)} />
          </div>
          {this.state.toggleError ? <h4>Please fill out all required fields.</h4> : null}
          <button className="submitButton" type="submit" onClick={e => this.handleSubmit(e)}>Continue to Payment</button>
          
        </form>
        <Link className="returnToCart" to="/cart">{"< Return to Cart"}</Link>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    cart_id: state.cart_id
  }
}

export default connect(mapStateToProps)(Checkout);