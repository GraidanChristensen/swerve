import './App.css';
import React, {Component} from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import routes from './routes';

class App extends Component{
  render(){
    return(
      <div className='App'>
        <div className="content">
          <Header/>
          {routes}
        </div>
        <footer>
          <Footer/>
        </footer>
      </div>
    )
  }
}

export default App;
