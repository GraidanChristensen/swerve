import React, {Component} from 'react';
import './Header.css';
import SWERVEWORD from '../../media/SWERVE WORD.png';
import hamburger from '../../media/hamburger.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearAdmin} from '../../redux/reducer';

import axios from 'axios';

//This component constantly displays on top of screen.
//nav is a menu to other pages. checks for admin logged in
// if admin is logged in displays products and orders links
// and logout button

class Header extends Component{
  constructor(){
    super();

    this.state = {
      toggleMenu: false,
      cartQuantity: null
    }
  }

  componentDidMount(){
    if(this.props.cart_id){
      this.getQuantity();
    }
  }

  componentDidUpdate(){
    if(this.props.cart_id){
      this.getQuantity();
    }
  }

  //toggles drop down menu
  toggleMenu = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu
    })
  }

  //handles logout. clears redux adminid and destroys session on backend
  logout = async () => {
    try{
      await axios.post('/admin/logout');
      this.props.clearAdmin();
      this.toggleMenu();
    }
    catch(err){
      alert(err);
    }
  }

  getQuantity = async () => {
    if(this.props.cart_id){
      try{
          const quantity = await axios.get(`/api/getquantity/${this.props.cart_id}`);
          if(quantity){
            this.setState({
              cartQuantity: quantity.data
            })
          }

      }
      catch(err){
        console.log(err);
      }
    }
  }

  render(){
    return(
      <div className='Header'>
        <header className='header'>
            <button onClick={this.toggleMenu} className='hamburgerButton'><img src={hamburger} alt='hamburger menu' className='hamburger'/></button>
            <Link to='/'><img className='headerLogo' alt='logo' src={SWERVEWORD}/></Link>
            <div className="menuList">
              <p className="filler"> </p>


              <nav>
              <Link onClick={this.toggleMenu} className="menuListItem" to='/'>Home</Link>
              <Link onClick={this.toggleMenu} className="menuListItem" to='/shop'>Shop</Link>
              <Link onClick={this.toggleMenu} className="menuListItem" to='/team'>Team</Link>
              {this.props.id ?
                <Link onClick={this.toggleMenu} className="menuListItem" to='/products'>Products</Link>
                : null
              }
              {this.props.id ?
                <Link onClick={this.toggleMenu} className="menuListItem" to='/orders'>Orders</Link>
                : null
              }
              {this.props.id ?
                  <Link onClick={this.logout} className="menuListItem" to="/">Logout</Link>
                  : null
              }
              </nav>

              <div className="cartHeader">
                <Link onClick={this.state.toggleMenu === true ? this.toggleMenu : null} className='cartButton'to='/cart'>Cart</Link>
                {this.state.cartQuantity ? <Link className='cartButton' to='/cart'>({this.state.cartQuantity})</Link> : null}
              </div>
            </div>
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
    id: state.id,
    cart_id: state.cart_id

  }
}

export default connect(mapStateToProps, {clearAdmin})(Header);