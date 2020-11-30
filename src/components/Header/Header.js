import React, {Component} from 'react';
import './Header.css';
import SWERVEWORD from '../../media/SWERVE WORD.png';
import hamburger from '../../media/hamburger.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearAdmin} from '../../redux/reducer';
import Axios from 'axios';

//This component constantly displays on top of screen.
//nav is a menu to other pages. checks for admin logged in
// if admin is logged in displays products and orders links
// and logout button

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

  logout = async () => {
    try{
      await Axios.post('/admin/logout');
      this.props.clearAdmin();
    }
    catch(err){
      alert(err);
    }
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
              {this.props.id ?
                <Link onClick={this.toggleMenu} className="menuLinks" to='/products'>Products</Link>
                : null
              }
              {this.props.id ?
                <Link onClick={this.toggleMenu} className="menuLinks" to='/orders'>Orders</Link>
                : null
              }
              {this.props.id ?
                  <Link onClick={this.logout} className="menuLinks" to="/">Logout</Link>
                  : null
              }
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

export default connect(mapStateToProps, {clearAdmin})(Header);