const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(401, "Email not found");
    }
    const comparePassword = await bcrypt.compare(password, user.password);

     if (!comparePassword) {
    throw RequestError(401, "Password is wrong");
    }
    
    

    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findOneAndUpdate(user_id, { token });
    res.json({
        token,
    });
}

module.exports = login;
