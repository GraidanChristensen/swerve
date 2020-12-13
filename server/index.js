require('dotenv').config();
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING, SECRET_KEY} = process.env;

const express = require('express');
const massive = require('massive');
const session = require('express-session');
const stripe = require('stripe')(SECRET_KEY)
const adminController = require('./adminControllers');
const shopController = require('./shopControllers');

const app = express();

const path = require('path')


app.use(express.static(`${__dirname}/../build`))
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
app.post('/email', shopController.emailer); //nodemailer
app.get('/getcustomer/:cart_id', shopController.getCustomer);
app.post('/clearcart', shopController.clearCart); //clear cart after order
//stripe payment
app.post('/api/payment', (req, res) => {
    const {price, token, id} = req.body;
    console.log("PRICE", price);
    const idempontencyKey = id;

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(cusomter =>{
        stripe.charges.create({
            amount: price,
            currency: 'usd',
            customer: cusomter.id
        }, {idempontencyKey})
    })
    .then(result => res.status(200).send("Transaction Complete"))
    .catch(err => console.log(err))

}); 



//adminENDPOINTS
app.post('/admin/login', adminController.login);
app.post('/admin/logout', adminController.logout);
app.post('/admin/addPost', adminController.addProduct);
app.delete('/admin/deleteProduct/:id', adminController.deleteProduct);
app.put('/admin/editProduct/:id', adminController.editProduct);
app.post('/api/addorder', adminController.addOrder);
app.put('/admin/fixinventory/:cart_id', adminController.fixInventory);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(SERVER_PORT, ()=>console.log(`Listening on ${SERVER_PORT}`));