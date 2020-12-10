import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getCart} from '../../redux/reducer';

import './Product.css';

//displays the product. calls getMyCart which checks the back end for a session with a cart id
// if no session it creates one. add to cart adds the product to the sessions cart
class Product extends Component{
  constructor(){
    super();
    
    this.state = {
      title: '',
      description: '',
      image: '',
      backImage: '',
      price: null,
      small: null,
      medium: null,
      large: null,
      xlarge: null,
      xxlarge: null,
      onesize: null,
      displayImage: '',
      soldOutToggle: false
    }
  }


  componentDidMount(){
    this.getProduct();
    this.getMyCart();
  }

  //gets the product using product id
  getProduct = async () => {
    try{
      const product = await axios.get(`/api/product/${this.props.match.params.productid}`)
      this.setState({
        title: product.data[0].title,
        description: product.data[0].description,
        image: product.data[0].image,
        backImage: product.data[0].back_image,
        price: product.data[0].price,
        small: product.data[0].amount_small,
        medium: product.data[0].amount_medium,
        large: product.data[0].amount_large,
        xlarge: product.data[0].amount_xlarge,
        xxlarge: product.data[0].amount_xxlarge,
        onesize: product.data[0].amount_onesize,
        displayImage: product.data[0].image,
        selectedSize: 'size',
        toggleDrop: false,
      })
    }
    catch(err){
      console.log(err);
    }
  }


  //gets cart_id off sesion and sets it to redux state
  // if there is no session it creates one
  getMyCart = async () => {
    try{
      const id = await axios.get('/api/getmycart');
      this.props.getCart(id.data.cart_id);
      console.log(id.data.cart_id);

    }
    catch (err) {
      console.log(err);
    }
  }

  //sets state value for slected size to be whatever user
  //selects on drop down menu
  handleSize = (e) => {
  
    this.setState({
      selectedSize: e.target.options[e.target.selectedIndex].value
    })

    if(!e.target.options[e.target.selectedIndex].text.includes("Sold")){
      this.setState({
        soldOutToggle: false
      })
    }

    if(e.target.options[e.target.selectedIndex].text.includes("Sold")){
      this.setState({
        soldOutToggle: true
      })
    }
  }

  // handles the add to cart button
  //axios call to add product to cart
  addToCart = async () => {
    // toggle dropdown to not show
    this.setState({
      toggleDrop: false
    })

    // get size off state
    const cartParams = {size: this.state.selectedSize, cart_id: this.props.cart_id}
    // // axios call sending product id off url params
    const cart = await axios.post(`/api/addtocart/${this.props.match.params.productid}`, cartParams);

    //toggle drop down to show
    this.setState({
      toggleDrop: true
    })

  }

  //changes display image 
  handleImage1 = () => {
    this.setState({
      displayImage: this.state.image
    })
  }

  //changes display image
  handleImage2 = () => {
    this.setState({
      displayImage: this.state.backImage
    })
  }

  render(){
    return(
      <div className='Product'>

          <div className={this.state.toggleDrop ? "cartDropDown" : "hideDropDown"}>
            <h5>Item added to your cart</h5>
            <div className="cartDropContent">
              <img alt="product" src={this.state.image}/>
              <div>
                <p>{this.state.title}</p>
                <p>${this.state.price}</p>
              </div>
            </div>
            <Link to='/cart' className="productButton">Go to cart</Link>
          </div>

          <div className = "productContent">
            <Link className="productButton" to='/shop'><h5>Back</h5></Link>
            <h1>{this.state.title}</h1>
            <img alt='product' className='productImage' src={this.state.displayImage}/>
            <div className="imageSelectors">
              <img alt='product' onClick={this.handleImage1} src={this.state.image}/>
              <img alt='product' onClick={this.handleImage2} src={this.state.backImage}/>
            </div>
            <h5>${this.state.price}</h5>
            {/* if the size is one size fits all only display that option */}
            {this.state.onesize ?
              <select onClick={e => this.handleSize(e)} name="sizes" id="sizes">
                <option value="size">Select Size</option>
                <option value="onesize"> {this.state.onesize ? "One Size" : "(Sold Out)"}</option>
              </select>
            : 
              <select onClick={e => this.handleSize(e)} name="sizes" id="sizes">
                <option value="size">Select Size</option>
                <option value="small">{this.state.small ? "Small" : "Small (Sold Out)"}</option>
                <option value="medium">{this.state.medium ? "Medium" : "Medium (Sold Out)"}</option>
                <option value="large">{this.state.medium ? "Large" : "Large (Sold Out)"}</option>
                <option value="xlarge">{this.state.medium ? "X Large" : "X Large (Sold Out)"}</option>
                <option value="xxlarge">{this.state.medium ? "XX Large" : "XX Large (Sold Out)"}</option>
              </select>
             }
             
            {!this.state.soldOutToggle ? <button disabled={this.state.selectedSize === "size"} className="addToCart" onClick={this.addToCart}>Add to Cart</button> : null}
            {this.state.soldOutToggle ? <button className="addToCart">Sold Out</button> : null}
            <h5>{this.state.description}</h5>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    cart_id: state.cart_id
  }
}

export default connect(mapStateToProps, {getCart})(Product);