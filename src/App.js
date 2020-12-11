import './App.css';
import React, {Component} from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import routes from './routes';

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51HwxW7Klb5Fyw3QKLdAdUKTjPCwDLUK2JrrpO5FMeXw3oCWv6dBaUg1TewhFGFCzp4o2IkZBeDNDDz6Aospt3R0l00DgbiyqcS');

class App extends Component{
  render(){
    return(
      <div className='App'>
        <div className="content">
          <Elements stripe={stripePromise}><Header/></Elements>
          <Elements stripe={stripePromise}>{routes}</Elements>
        </div>
        <footer>
          <Elements stripe={stripePromise}><Footer/></Elements>
        </footer>
      </div>
    )
  }
}

export default App;
