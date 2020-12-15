import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Confirmation.css';
import darkgram from '../../media/darkgram.png';

class Confirmation extends Component{
  render(){
    return(
      <div className='Confirmation'>
        <h1>Thank you</h1>
        <p>We appreciate the love and support. We will send a confirmation email and
             your swerve goods will be shipped out as soon as possible. Enjoy!
        </p>
        <h3>Order Id: {this.props.match.params.orderid}</h3>
        <Link to='/'><button>Back Home</button></Link>
        <a rel="noreferrer" target="_blank" href="https://www.instagram.com/swerve.skiing/"><img className="socials" alt="instagram" src={darkgram}/></a>
      </div>
    )
  }
}

export default Confirmation;