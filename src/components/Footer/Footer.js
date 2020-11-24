import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';
class Footer extends Component{
  render(){
    return(
      <div className='Footer'>
        <Link to='/admin'><h5>Lock symbol</h5></Link>
        <p>contact information goes here </p>
      </div>
    )
  }
}

export default Footer;