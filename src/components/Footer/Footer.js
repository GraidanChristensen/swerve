import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import lock from '../../media/Lock.png';
import './Footer.css';
class Footer extends Component{
  render(){
    return(
      <div className='Footer'>
        <Link to='/admin'><img alt='lock' src={lock}/></Link>
        <p>contact information goes here </p>
      </div>
    )
  }
}

export default Footer;