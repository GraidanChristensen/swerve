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
        {routes}
        <footer>
          <Footer/>
        </footer>
      </div>
    )
  }
}

export default App;
