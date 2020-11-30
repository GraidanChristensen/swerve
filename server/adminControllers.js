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

    }

}