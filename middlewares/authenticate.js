const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const {RequestError} = require("../helpers");

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer"|| !token) {
    next(RequestError(401, "Unauthorized"));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne(id);
            if (!user || !user.token) {
            next(RequestError(401, "Unauthorized"));
            }
    req.user = user;
    next();
    } catch (error) {
         next(RequestError(401, error.message));
  };
}
module.exports = authenticate;