
const User = require('../models/user.model');

const getUsers = (req, res)=> {
    res.json({
        ok: true,
        users: []
    })
}

const createUser = async (req, res)=> {
    console.log(req.body);
    const {email, password, name} = req.body;
    const user = new User(req.body);

    await user.save();
    res.json({
        ok: true,
        user: user
    })
}

module.exports = {getUsers,createUser}