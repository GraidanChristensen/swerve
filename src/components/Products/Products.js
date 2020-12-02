import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Products.css';

// this class component is only availabe when an admin is logged in
// it shows the list of products currently on the site
// you can add delete and edit products

class Products extends Component{
  constructor(){
    super();

    this.state={
      products: [],
      toggleAdd: false,
      title: '',
      description: '',
      image: '',
      back_image: '',
      price: 0,
      small: 0,
      medium: 0,
      large: 0,
      xlarge: 0,
      xxlarge: 0
    }
  }

  //calls function to get all products if logged in as admin 
  //if not logged in sent back to home page
  componentDidMount(){
    if(this.props.id){
    this.getProducts();
    }
    else{
      this.props.history.push('/');
    }
  }

  //axios call to get all products from db and store to state
  getProducts = async () => {
    try{
      const products = await axios.get('/api/products');
      this.setState({
        products: products.data
      })
    }
    catch(err){
      console.log(err)
    }
  }

  //controls toggle bool in state to display input/buttons for adding
  toggleAdd = () => {
    this.setState({
      toggleAdd: !this.state.toggleAdd
    })
  }

  //fires when cancel button is clicked
  //makes state variable falsey and togglesAdd
  cancelAdd = () => {
    this.setState({
      title: '',
      description: '',
      image: '',
      back_image: '',
      price: 0,
      small: 0,
      medium: 0,
      large: 0,
      xlarge: 0,
      xxlarge: 0
    });

    this.toggleAdd();
  }

  //handles input changes
  changeHandler = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

  addProduct = async () => {
    const {title, description, image, back_image, price, small, medium, large, xlarge, xxlarge} = this.state;
    await axios.post('/admin/addPost', {title, description, image, back_image, price, small, medium, large, xlarge, xxlarge} );
    this.cancelAdd(); // resets state values and toggles 
    this.getProducts(); // get new products
  }


  render(){
    const mappedProducts = this.state.products.map((product, index)=> {
      return(
        <div key={index} className="adminProduct">
            <img src={product.image} alt="product"/>
            <img src={product.back_image} alt="product"/>
            <p>ID: {product.product_id}</p>
            <p>Title: {product.title}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <p>S: {product.amount_small}</p>
            <p>M: {product.amount_medium}</p>
            <p>L: {product.amount_large}</p>
            <p>XL: {product.amount_xlarge}</p>
            <p>XXL: {product.amount_xxlarge}</p>
            <Link to={`/edit/${product.product_id}`}><button className="editButton">Edit</button></Link>
        </div>
      )
    })

    return(
      <div className='Products'>
        <div className='adminProductGrid'>
          <button onClick={this.toggleAdd} className={!this.state.toggleAdd ? "addProduct" : "addButton"}>Add Product</button>
          <input name="title" value={this.state.title} onChange={ e => this.changeHandler(e)} className={!this.state.toggleAdd ? "inputAdd": "showInputAdd"} placeholder="title"/>
          <input name="description" value={this.state.description} onChange={ e => this.changeHandler(e)} className={!this.state.toggleAdd ? "inputAdd": "showInputAdd"} placeholder="description"/>
          <input name="image" value={this.state.image} onChange={ e => this.changeHandler(e)} className={!this.state.toggleAdd ? "inputAdd": "showInputAdd"} placeholder="image"/>
          <input name="back_image" value={this.state.back_image} onChange={ e => this.changeHandler(e)} className={!this.state.toggleAdd ? "inputAdd": "showInputAdd"} placeholder="image2"/>
          <input name="price" value={this.state.price} onChange={ e => this.changeHandler(e)} className={!this.state.toggleAdd ? "inputAdd": "showInputAdd"} placeholder="price"/>
          <input name="small" value={this.state.small} onChange={ e => this.changeHandler(e)} className={!this.state.toggleAdd ? "inputAdd": "showInputAdd"} placeholder="small"/>
          <input name="medium" value={this.state.medium} onChange={ e => this.changeHandler(e)} className={!this.state.toggleAdd ? "inputAdd": "showInputAdd"} placeholder="medium"/>
          <input name="large" value={this.state.large} onChange={ e => this.changeHandler(e)} className={!this.state.toggleAdd ? "inputAdd": "showInputAdd"} placeholder="large"/>
          <input name="xlarge" value={this.state.xlarge} onChange={ e => this.changeHandler(e)} className={!this.state.toggleAdd ? "inputAdd": "showInputAdd"} placeholder="xlarge"/>
          <input name="xxlarge" value={this.state.xxlarge} onChange={ e => this.changeHandler(e)} className={!this.state.toggleAdd ? "inputAdd": "showInputAdd"} placeholder="xxlarge"/>
          <button onClick={this.addProduct} className={!this.state.toggleAdd ? "addButton": "showAddButton"}>Add</button>
          <button onClick={this.cancelAdd} className={!this.state.toggleAdd ? "addButton": "showAddButton"}>Cancel</button>
          {mappedProducts}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    id: state.id
  }
}

export default connect(mapStateToProps)(Products);