import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Orders.css';
class Orders extends Component{
  constructor(){
    super();
  }
  
  componentDidMount(){
    if(!this.props.id){
      this.props.history.push('/');
    }
}

  render(){
    return(
      <div className='Orders'>
          <h1>Orders</h1>
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