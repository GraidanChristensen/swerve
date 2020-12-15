import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Details.css';

class Details extends Component{
  constructor(){
    super();

    this.state={
    }
  }
  
  componentDidMount(){
    if(!this.props.id){
      this.props.history.push('/');
    }
}


  render(){
    return(
      <div className='Orders'>
          <h1>Details</h1>
      </div>
    )
  }
}


function mapStateToProps(state){
    return{
      id: state.id
    }
  }
  
  export default connect(mapStateToProps)(Details);