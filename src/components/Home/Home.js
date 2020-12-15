import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCart} from '../../redux/reducer';
import fisheye from '../../media/fisheye.JPG';
import porter from '../../media/porter.jpg';
import colt from '../../media/colt.jpg'
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
        <img className="homeImage" alt="home" src="https://swerveski.s3-us-west-1.amazonaws.com/homeimage.jpg"/>
        <h3>2020 Winter Collection</h3>
        <div className="homegrid">
          <div className="gridItem">
            <img  alt="home" src={fisheye}/>
          </div>
          <div className="gridItem">
            <p>Portobello and Coletyn in the alien tee</p>
          </div>
          <div className="gridItem">
            <img alt="porter in alien tee" src={porter}/>
          </div>
          <div className="gridItem">
            <img alt="colt in alien tee" src={colt}/>
          </div>
        </div>
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