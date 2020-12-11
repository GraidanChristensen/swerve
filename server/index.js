require('dotenv').config();

const express = require('express');
const massive = require('massive');
const session = require('express-session');

const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env;
const adminController = require('./adminControllers');
const shopController = require('./shopControllers');

const app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then( db => {
    app.set('db', db)
    console.log('connected to db')
}).catch( err => console.log(err));


//shopENDPOINTS
app.get('/api/products', shopController.getProducts);
app.get('/api/product/:id', shopController.getProduct);
app.get('/api/getmycart', shopController.getMyCart);
app.post('/api/addtocart/:product_id', shopController.addToCart);
app.get('/api/getquantity/:cart_id', shopController.getQuantity);
app.get('/api/cart/:cart_id', shopController.getCart);
app.get('/api/carttotal/:cart_id', shopController.getSum);
app.delete('/api/deleteitem/:cartref', shopController.deleteItem);
app.post('/api/addcustomer/:cartid', shopController.addCustomer);
app.post('/api/payment', shopController.payment); //stripe payment
app.post('/email', shopController.emailer); //nodemailer
app.get('/getcustomer/:cart_id', shopController.getCustomer);
app.post('/clearcart', shopController.clearCart); //clear cart after order


//adminENDPOINTS
app.post('/admin/login', adminController.login);
app.post('/admin/logout', adminController.logout);
app.post('/admin/addPost', adminController.addPost);
app.delete('/admin/deleteProduct/:id', adminController.deleteProduct);
app.put('/admin/editProduct/:id', adminController.editProduct);
app.post('/api/addorder', adminController.addOrder);
app.put('/admin/fixinventory/:cart_id', adminController.fixInventory);


app.listen(SERVER_PORT, ()=>console.log(`Listening on ${SERVER_PORT}`));