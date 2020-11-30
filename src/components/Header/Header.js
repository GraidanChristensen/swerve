import React, {Component} from 'react';
import './Header.css';
import SWERVEWORD from '../../media/SWERVE WORD.png';
import hamburger from '../../media/hamburger.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends Component{
  constructor(){
    super();

    this.state = {
      toggleMenu: false
    }
  }

  toggleMenu = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu
    })
  }

  render(){
    return(
      <div className='Header'>
        <header className='header'>
            <button onClick={this.toggleMenu} className='hamburgerButton'><img src={hamburger} alt='hamburger menu' className='hamburger'/></button>
            <Link to='/'><img className='headerLogo' alt='logo' src={SWERVEWORD}/></Link>
            <Link onClick={this.state.toggleMenu === true ? this.toggleMenu : null} className='cartButton'to='/cart'>Cart</Link>
        </header>
        <nav className={`menu ${this.state.toggleMenu ? "showMenu" : ""}`}>
              <Link onClick={this.toggleMenu} className="menuLinks" to='/'>Home</Link>
              <Link onClick={this.toggleMenu} className="menuLinks" to='/shop'>Shop</Link>
              <Link onClick={this.toggleMenu} className="menuLinks" to='/team'>Team</Link>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    id: state.id
  }
}

export default connect(mapStateToProps)(Header);