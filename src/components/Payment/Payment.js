import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Payment.css';

class Payment extends Component{

  render(){
    return(
      <div className='Payment'>
        <h1>Payment</h1>
      </div>
    )
  }
}

export default Payment;