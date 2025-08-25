import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true 
}));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ✅ Import routes only once
import userRoutes from "./routes/user.routes.js";
console.log("✅ User routes loaded");

// ✅ Mount routes
app.use("/api/v1/users", userRoutes);

export default app;
