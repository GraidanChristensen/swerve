const nodemailer = require('nodemailer');

module.exports = {
    getProducts: async (req, res) => {
        const db = req.app.get('db');
        
        try{
        const products = await db.get_products();
        return res.status(200).send(products);
        }
        catch (err) {
            console.log(err);
        }
    },

    getProduct: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        try{
        const product = await db.get_product([id]);
        return res.status(200).send(product);
        }
        catch(err){
            console.log(err);
        }
    },

    addToCart: async (req, res) => {
        const db = req.app.get('db');
        const {product_id}=req.params;
        const {size, cart_id}= req.body

        // add to to cart_reference table with product id and cart id from session
        console.log(size);
        const cartref = await db.add_to_cart([product_id, req.session.cart.cart_id, size]);
        console.log(cartref);
        //update price and quantity on cart table
        //get sum of all products in cart
        const [totalPrice] = await db.sum_of_cart([req.session.cart.cart_id]);

        //get total amount of products in cart
        const [totalQuantity] = await db.quantity_of_cart([req.session.cart.cart_id]);

        //update the total_price and total_quantity on cart table
        const updatedCart = await db.update_cart([req.session.cart.cart_id, totalPrice.sum, totalQuantity.count]);
        
        //return updatedcart
        return res.status(200).send(updatedCart);
    },

    getMyCart: async (req, res) => {
        const db = req.app.get('db');

        if(!req.session.cart){
            const cart = await db.create_cart();

            req.session.cart = {
                cart_id: cart[0].cart_id
            }        
        }

        return res.status(200).send(req.session.cart);

    },

    getQuantity: async (req, res) => {
        const db = req.app.get('db');
        const {cart_id} = req.params;

        const quantity = await db.quantity_of_cart([cart_id]);

        return res.status(200).send(quantity[0].count);
    },

    getCart: async (req, res) => {
        const db = req.app.get('db');
        const {cart_id} = req.params;
        try{
            const cart = await db.get_cart_items([cart_id]);
            return res.status(200).send(cart);
        }
        catch(err){
            console.log(err)
        }
    },

    getSum: async (req, res) => {
        const db = req.app.get('db');
        const {cart_id} = req.params;

        const total = await db.sum_of_cart([cart_id]);
        return res.status(200).send(total);
    },

    deleteItem: async (req, res) => {
        const db = req.app.get('db');
        const{cartref} = req.params;

        await db.delete_item([cartref]);
        return res.status(200);
    },

    addCustomer: async (req, res) => {
        const db = req.app.get('db');
        const{cartid} = req.params;
        console.log(cartid);
        const{email, firstName, lastName, address, apartment, city, country, state, postalCode, phone} = req.body;

        const customer = await db.add_customer([email, firstName, lastName, address, apartment, city, country, state, postalCode, phone, cartid]);
        await db.set_cart_customer_id([customer[0].customer_id,cartid])
        return res.status(200).send(customer);
    },

    emailer: async (req, res) => {
        const {email} = req.body; 
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "sallie36@ethereal.email", // generated ethereal user
              pass: "fRbAMVMX7kqJqE3WGW", // generated ethereal password
            },
          });
        
          const msg = {
            from: '"Swerve Skiing" <swerve.noreply@example.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Order Confirmation", // Subject line
            text: "Thank you for your order, we will ship it out soon. Swerve.", // plain text body
          }
          // send mail with defined transport object
          let info = await transporter.sendMail(msg);
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).send("Email sent");
    },

    getCustomer: async (req, res) => {
        const db = req.app.get('db');
        const {cart_id} = req.params;

        const customer = await db.get_customer([cart_id]);
        return res.status(200).send(customer);
        
    },

    clearCart: async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
    
}