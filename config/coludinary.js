// import { v2 as cloudinary } from 'cloudinary'

// const connectCloudinary = async()=>{
//     cloudinary.config({
//         cloud_name:process.env.CLOUDINARY_NAME,
//         api_key:process.env.CLOUDINARY_API_KEY,
//         api_secret:process.env.CLOUDINARY_SECRET_KEY
//     })
// }

// export default connectCloudinary

import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });

        // Test the connection by making a simple API call
        const result = await cloudinary.api.ping();
        console.log('Cloudinary Connected Successfully');
        
    } catch (error) {
        console.error('Cloudinary connection failed:', error.message);
        throw error; // Re-throw to handle in your main application
    }
};

export default connectCloudinary;