import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Admin from './components/Admin/Admin';
import Products from './components/Products/Products';
import Orders from './components/Orders/Orders';
import Team from './components/Team/Team';
import Edit from './components/Edit/Edit';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Payment/Payment';
import Confirmation from './components/Confirmation/Confirmation';
import Details from './components/Order Details/Details';
export default(
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/shop' component={Shop}/>
        <Route path='/product/:productid' component={Product}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/admin' component={Admin}/>
        <Route path='/products' component={Products}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/team' component={Team}/>
        <Route path='/edit/:productid' component={Edit}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/payment'  component={Payment}/>
        <Route path='/confirmation/:orderid' component={Confirmation}/>
        <Route path='/details/:order_id' component={Details}/>
    </Switch>
)