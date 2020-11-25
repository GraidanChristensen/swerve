import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Shop.css';
class Shop extends Component{
  constructor(){
    super();

    this.state={
      products: [],
    }
  }

  componentDidMount(){
    this.getProducts();
  }

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

  render(){
    const mappedProducts = this.state.products.map((product, index)=> {
      return(
          <Link key={index} className='grid-product' to={`/product/${product.product_id}`}>
            <img alt="product" src={product.image}/>
            <h3>{product.title}</h3>
            <h3>${product.price}</h3>
          </Link>
      )
    })
    return(
      <div className='Shop'>
        <div className='product-grid'>
          {mappedProducts}
        </div>
      </div>
    )
  }
}

export default Shop;