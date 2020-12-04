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
        const cartref = await db.add_to_cart([product_id, req.session.cart.cart_id, size]);

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

        console.log("hit");
        if(!req.session.cart){
            const cart = await db.create_cart();

            req.session.cart = {
                cart_id: cart[0].cart_id
            }        
        }

        return res.status(200).send(req.session.cart);

    }
}