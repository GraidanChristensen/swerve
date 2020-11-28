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
    }
}