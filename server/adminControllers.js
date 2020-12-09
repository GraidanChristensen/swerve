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

    addPost: async (req, res) => {
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
    }

}