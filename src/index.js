import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" }); // load env variables

const app = express();

// connect DB
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Server error:", err);
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });




// the below code is for connecting to MongoDB and setting up an Express server 
// {// {// Import the Mongoose library for MongoDB interactions
// // import mongoose from "mongoose";

// // // Import a constant from another file (not used in current code but could be useful for DB name)
// // import { DB_NAME } from "./constants";

// // // Import the Express library to create the HTTP server
// // import express from "express";

// // // Immediately Invoked Async Function Expression (IIFE) to allow async/await at the top level
// // (async () => {
// //     try {
// //         // Connect to MongoDB using the URI from environment variables
// //         // NOTE: Use backticks (`) instead of quotes to enable template literals
// //         await mongoose.connect(`${process.env.MONGODB_URI}`);

// //         // Log success message if connected
// //         console.log("Connected to MongoDB successfully");

// //         // Create an Express app instance
// //         const app = express();

// //         // Define a GET route at the root path "/"
// //         // This is optional, but useful to check if server is working
// //         app.get("/", (req, res) => {
// //             res.send("Hello, VideoTube!");
// //         });

// //         // Define the server port (from env or default 3000)
// //         const PORT = process.env.PORT || 3000;

// //         // Start the server and listen for requests
// //         app.listen(PORT, () => {
// //             console.log(`Server is running on port ${PORT}`);
// //         });

// //         // Handle server errors
// //         app.on("error", (err) => {
// //             console.error("Server error:", err);
// //         });

// //         // Handle MongoDB connection errors
// //         mongoose.connection.on("error", (err) => {
// //             console.error("MongoDB connection error:", err);
// //         });

// //     } catch (error) {
// //         // Log and throw any error that occurs during connection
// //         console.error("Error connecting to MongoDB:", error);
// //         throw error;
// //     }
// // })();
// // }
// }
//The Below code is for connecting to MongoDB and setting up an Express server but using another file
