// import mongoose from "mongoose";

// const connectDB=async()=>{
//     mongoose.connection.on("connected",()=>console.log("Database Connected"))
//     await mongoose.connect(`${process.env.MONGODB_URI}/Healthcare`)

// }


// export default connectDB

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Set up event listeners first
        mongoose.connection.on("connected", () => console.log("✅ Database Connected"));
        mongoose.connection.on("error", (err) => console.log("❌ Database Error:", err));
        
        // Use the complete URI directly from environment variable
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log("🔄 MongoDB connection initiated...");
    } catch (error) {
        console.error("💥 Database connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;