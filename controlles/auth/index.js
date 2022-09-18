const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const subscription = require("./subscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerificationEmail = require("./resendVerificationEmail")



module.exports = {
    register,
    login,
    logout,
    current,
    current,
    subscription,
    updateAvatar,
    verifyEmail,
    resendVerificationEmail,

}