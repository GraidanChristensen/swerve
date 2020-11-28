require('dotenv').config();

const express = require('express');
const massive = require('massive');

const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env;
const adminController = require('./adminControllers');
const shopController = require('./shopControllers');

const app = express();

app.use(express.json());

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

app.listen(SERVER_PORT, ()=>console.log(`Listening on ${SERVER_PORT}`));