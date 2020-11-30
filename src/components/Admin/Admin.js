import axios from 'axios';
import React, {Component} from 'react';
import './Admin.css';
import {connect} from 'react-redux';
import {getAdmin} from '../../redux/reducer';

class Admin extends Component{
  constructor(){
    super();

    this.state = {
      username: '',
      password: ''
    }
  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  login = async () =>{
    const {username, password} = this.state;
    try{
      const user = await axios.post('/admin/login', {username, password});
      console.log(user.data)
      this.props.getAdmin(user.data.admin_id);
      this.props.history.push('/');
    }
    catch(err){
      alert(err.response.request.response);
    }
  }

  render(){
    return(
      <div className='Admin'>
          <div className="loginBox">
            <h1>Admin Login</h1>
            <h5>username</h5>
            <input onChange={this.handleUsername}></input>
            <h5>password</h5>
            <input onChange={this.handlePassword}></input>
            <button onClick={this.login}>Login</button>
          </div>
      </div>
    )
  }
}

export default connect(null, {getAdmin})(Admin);