const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
    // Get token from req header
    const token = getTokenFromHeader(req);
    // Verify token
    const decodedUser = verifyToken(token);
    // Save the user into req obj
    req.user = decodedUser.id;
    if (!decodedUser) {
        return res.json({
            error: "Invalid/expired token, please login again"
        });
    }
    next();
};

module.exports = isLogin;