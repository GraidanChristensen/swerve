import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Edit.css';
class Edit extends Component{
    constructor(){
        super();

        this.state = {
            product: {},
            titleInput: '',
            descriptionInput: '',
            imageInput: '',
            back_imageInput: '',
            priceInput: 0,
            smallInput: 0,
            mediumInput: 0,
            largeInput: 0,
            xlargeInput: 0,
            xxlargeInput: 0,
            onesizeInput: 0
        }
    }

//if admin is not logged in sends back to home page
//if admin is logged in get product
componentDidMount(){
    if(this.props.id){
        this.getProduct();
    }
    else{
          this.props.history.push('/');
    }
}


//uses id passes on url to get product from database
getProduct = async () => {
    try{
        const product = await axios.get(`/api/product/${this.props.match.params.productid}`)
        this.setState({
            product: product.data[0],
            titleInput: product.data[0].title,
            descriptionInput: product.data[0].description,
            imageInput: product.data[0].image,
            back_imageInput: product.data[0].back_image,
            priceInput: product.data[0].price,
            smallInput: product.data[0].amount_small,
            mediumInput: product.data[0].amount_medium,
            largeInput: product.data[0].amount_large,
            xlargeInput: product.data[0].amount_xlarge,
            xxlargeInput: product.data[0].amount_xxlarge,
            onesizeInput: product.data[0].amount_onesize
        })
    }
    catch(err){
        console.log(err);
    }
}

//comopletely deletes a product from db
deleteProduct = async () => {
    try{
        await axios.delete(`/admin/deleteProduct/${this.state.product.product_id}`)
        this.props.history.push('/products');
    }
    catch(err){
        console.log(err)
    }
}

  //handles input changes
  changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // gets called on click of cancel button
    // resets state and goes back to products page
    cancelEdit = () => {
        this.props.history.push('/products');
    }

    editProduct = async () => {
        const {
            titleInput,
            descriptionInput,
            imageInput,
            back_imageInput,
            priceInput,
            smallInput,
            mediumInput,
            largeInput,
            xlargeInput,
            xxlargeInput,
            onesizeInput} = this.state;
        try{
            await axios.put(`/admin/editProduct/${this.props.match.params.productid}`, {
                titleInput,
                descriptionInput,
                imageInput,
                back_imageInput,
                priceInput,
                smallInput,
                mediumInput,
                largeInput,
                xlargeInput,
                xxlargeInput,
                onesizeInput})
                
            this.props.history.push('/products');
        }
        catch (err){
            console.log(err)
        }
    }

  render(){
    return(
      <div className='Edit'>
          <h3>Edit Product</h3>
          <h5>Title: {this.state.product.title}</h5>
          <input onChange={ e => this.changeHandler(e)} name="titleInput"/>
          <h5>Description: {this.state.product.description}</h5>
          <input onChange={ e => this.changeHandler(e)} name="descriptionInput"/>
          <div className="editImages">
            <img alt="product" src={this.state.product.image} />
            <img alt="product" src={this.state.product.back_image} />
          </div>
          <input onChange={ e => this.changeHandler(e)} name="imageInput" placeholder="image one"/>
          <input onChange={ e => this.changeHandler(e)} name="back_imageInput" placeholder="image two"/>
          <h5>Price: {this.state.product.price}</h5>
          <input onChange={ e => this.changeHandler(e)} name="priceInput"/>
          <h5>Small: {this.state.product.amount_small}</h5>
          <input onChange={ e => this.changeHandler(e)} name="smallInput"/>
          <h5>Medium: {this.state.product.amount_medium}</h5>
          <input onChange={ e => this.changeHandler(e)} name="mediumInput"/>
          <h5>Large: {this.state.product.amount_large}</h5>
          <input onChange={ e => this.changeHandler(e)} name="largeInput"/>
          <h5>Xlarge: {this.state.product.amount_xlarge}</h5>
          <input onChange={ e => this.changeHandler(e)} name="xlargeInput"/>
          <h5>XXlarge: {this.state.product.amount_xxlarge}</h5>
          <input onChange={ e => this.changeHandler(e)} name="xxlargeInput"/>
          <h5>OneSize: {this.state.product.amount_onesize}</h5>
          <input onChange={ e => this.changeHandler(e)} name="onesizeInput"/>
          <div className="editButtons">
          <button onClick={this.deleteProduct}>Delete</button>
          <button onClick={this.editProduct}>Save</button>
          <button onClick={this.cancelEdit}>Cancel</button>
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
  
  export default connect(mapStateToProps)(Edit);