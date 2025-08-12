// import jwt from 'jsonwebtoken'

// // user authentication middleware

// const authUser = async (req, res, next) => {
//     try {
//         const { token } = req.headers;
//         if (!token) {
//             return res.json({ success: false, message: "Not Authorized Login Again" });
//         }

//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { userId: token_decode.id }; // ✅ store in req.user
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// export default authUser;
import jwt from 'jsonwebtoken';

// ✅ User authentication middleware
const authUser = async (req, res, next) => {
    try {
        // Extract token (Supports "Bearer <token>" format and direct token)
        let token = req.headers.authorization?.split(" ")[1] || req.headers.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to req.user
        req.user = { userId: decoded.id };

        next();
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authUser;
 
