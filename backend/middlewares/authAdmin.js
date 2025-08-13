// import jwt from 'jsonwebtoken'


// //admin authentication middleware

// const authAdmin = async ( req, res,next)=>{
//     try {

//         const {atoken } =req.headers
//         if(!atoken){
//             return res.json({success:false,message:"Not Authorized Login Again"})
//         }
//         const token_decode=jwt.verify(atoken, process.env.JWT_SECRET)

//         if(token_decode!== process.env.ADMIN_EMAIL +process.env.ADMIN_PASSWORD){
//              return res.json({success:false,message:"Not Authorized Login Again"})
//         }

//         next()
        
//     } catch (error) {
//         console.log({success:false,message:error.message})
        
//     }

// }

// export default authAdmin
import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    // Get the token from headers (case-insensitive)
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    // Verify the token
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    // Compare with concatenated admin email + password
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    // If authorized, go to next middleware
    next();

  } catch (error) {
    // Send error instead of just logging
    return res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
