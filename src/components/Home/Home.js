import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCart} from '../../redux/reducer';
import homeimage from '../../media/homeimage.JPG';
import axios from 'axios';
import './Home.css';

class Home extends Component{

  componentDidMount(){
    this.getMyCart();
  }


  //gets cart_id off sesion and sets it to redux state
  // if there is no session it creates one
  getMyCart = async () => {
    if(!this.props.id){
      try{
        const id = await axios.get('/api/getmycart');
        this.props.getCart(id.data.cart_id);
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  render(){
    return(
      <div className='Home'>
        <h1>Home</h1>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    cart_id: state.cart_id,
    id: state.id
  }
}

export default connect(mapStateToProps, {getCart})(Home);