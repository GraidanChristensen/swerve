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
    </Switch>
)