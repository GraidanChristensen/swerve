import React, {Component} from 'react';
import './Header.css';
import SWERVEWORD from '../../media/SWERVE WORD.png';
import {Link} from 'react-router-dom';

class Header extends Component{
  render(){
    return(
      <div className='Header'>
          <Link to='/'><img className='headerLogo' alt='logo' src={SWERVEWORD}/></Link>
            <nav className='menu'>
              <Link className="menuLinks" to='/'>Home</Link>
              <Link className="menuLinks" to='/shop'>Shop</Link>
              <Link className="menuLinks" to='/team'>Team</Link>
              <Link className='cartButton'to='/cart'>Cart</Link>
            </nav>
      </div>
    )
  }
}

export default Header;