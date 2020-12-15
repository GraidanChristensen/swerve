import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Orders.css';
//get all the orders
// map over them to display them
// more details page
class Orders extends Component{
  constructor(){
    super();

    this.state={
      orders: []
    }
  }
  
  componentDidMount(){
    if(!this.props.id){
      this.props.history.push('/');
    }
    else{
      this.getOrders();
    }
}

  getOrders = async () => {
    //axios call set orders
    const orders = await axios.get('/orders');
    this.setState({
      orders: orders.data
    })
  }

  render(){
    const mappedOrders = this.state.orders.map((order, index)=> {
      return(
          <div key={index}>
            <h3>Order Id: {order.order_id}</h3>
            <h3>Status: {order.fulfilled ? "Fulfilled" : "Unfulfilled"}</h3>
            <Link to={`/details/${order.order_id}`}>More Details</Link>
          </div>
      )
    })
    return(
      <div className='Orders'>
          <h1>Orders</h1>
          {mappedOrders}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    id: state.id
  }
}

export default connect(mapStateToProps)(Orders);