import './App.css';
import React, {Component} from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import routes from './routes';
class App extends Component{
  render(){
    return(
      <div className='App'>
        <Header/>
        <Footer/>
        {routes}
      </div>
    )
  }
}

export default App;
