import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import lock from '../../media/Lock.png';
import instagram from '../../media/instagram.png';
import './Footer.css';
class Footer extends Component{
  render(){
    return(
      <div className='Footer'>
        <Link to='/admin'><img className="lock" alt='lock' src={lock}/></Link>
        <p>contact information goes here </p>
        <a rel="noreferrer" target="_blank" href="https://www.instagram.com/swerve.skiing/"><img className="socials" alt="instagram" src={instagram}/></a>
        </div>
    )
  }
}

export default Footer;