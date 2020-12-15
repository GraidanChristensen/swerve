module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;

        const foundUser = await db.check_user(username);
        const user = foundUser[0];

        if(!user){
            return res.status(401).send("Incorrect login information");
        }

        if(password === user.password){
            req.session.admin_id = {
                admin_id: user.admin_id
            }
            return res.status(200).send(user);
        }
        else{
            return res.status(401).send("Incorrect login info");
        }

    },

    logout: async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    addProduct: async (req, res) => {
        const db = req.app.get('db');
        const {title, description, image, back_image, price, small, medium, large, xlarge, xxlarge, oneSize} = req.body;
        const newProduct = await db.add_product([title, description, image, back_image, price, small, medium, large, xlarge, xxlarge, oneSize]);
        return res.sendStatus(200);
    },

    deleteProduct: async (req, res) => {
        const db = req.app.get('db');
        const{id} = req.params;

        await db.delete_product([id]);
        return res.status(200).send("Deleted");

    },

    editProduct: async (req, res) => {
        const db = req.app.get('db');
        const{id} = req.params;

        //desctructure object coming from body. comes from the state on the edit page front end
        const {titleInput, descriptionInput, imageInput, back_imageInput, priceInput, smallInput, mediumInput, largeInput, xlargeInput, xxlargeInput, onesizeInput} = req.body;
        console.log(onesizeInput);
        const editedProduct = await db.edit_product([id, titleInput, descriptionInput, imageInput, back_imageInput, priceInput, smallInput, mediumInput, largeInput, xlargeInput, xxlargeInput, onesizeInput])
        return res.status(200).send(editedProduct);
    },

    addOrder: async (req, res) => {
        const db = req.app.get('db');
        const {cart_id, customer_id} = req.body;

        const order = await db.add_order([cart_id, customer_id]);
        return res.status(200).send(order);
    },

    fixInventory: async (req, res) => {
        const db = req.app.get('db');
        const {cart_id} = req.params;
        // get all items in cart
        const items = await db.get_cart_items([cart_id]);

        // for each product obj in array check for size and product and subtract one from corresponding quantity
        for(let i = 0; i < items.length; i++) {
            if(items[i].size === 'small'){
                await db.fix_small_inventory([items[i].product_id, (+items[i].amount_small - 1)]);
            }
            if(items[i].size === 'medium'){
                await db.fix_medium_inventory([items[i].product_id, (+items[i].amount_medium - 1)]);
            }
            if(items[i].size === 'large'){
                await db.fix_large_inventory([items[i].product_id, (+items[i].amount_large - 1)]);
            }
            if(items[i].size === 'xlarge'){
                await db.fix_xlarge_inventory([items[i].product_id, (+items[i].amount_xlarge - 1)]);
            }
            if(items[i].size === 'xxlarge'){
                await db.fix_xxlarge_inventory([items[i].product_id, (+items[i].amount_xxlarge - 1)]);
            }
            if(items[i].size === 'onesize'){
                await db.fix_onesize_inventory([items[i].product_id, (+items[i].amount_onesize - 1)]);
            }
        }
        return res.status(200).send("Success");
    },

    getOrders: async (req, res) => {
        const db =  req.app.get('db');
        
        const orders = await db.get_orders();
        return res.status(200).send(orders);
    }

}