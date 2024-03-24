const jwt = require("../utils/jwt");
const JWT_SECRET = "your-secret-key"; // Assuming your secret key is stored in a file called keys.js

const verifyToken = async (req, res, next) => {
    try {
        const header = req.header("Authorization");
        
        if (header === undefined) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request!",
                data: [],
            });
        }
        const token = header.replace("Bearer ", "");
       
        const user = await jwt.verify_token(token, JWT_SECRET);
        
        req.user = user.data;
        
        return next();
    } catch (e) {
        let errorMessage = e.message || "Unknown error";
        return res.status(401).json({
            success: false,
            message: `Token is expired with message: ${errorMessage}`,
            data: [],
        });
    }
};

module.exports = {verifyToken}
