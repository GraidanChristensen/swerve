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
        const {title, description, image, back_image, price, small, medium, large, xlarge, xxlarge} = req.body;
        const newProduct = await db.add_product([title, description, image, back_image, price, small, medium, large, xlarge, xxlarge]);
        return res.sendStatus(200);
    },

    deleteProduct: async (req, res) => {
        const db = req.app.get('db');
        const{id} = req.params;

        await db.delete_product([id]);
        return res.status(200).send("Deleted");

    }

}