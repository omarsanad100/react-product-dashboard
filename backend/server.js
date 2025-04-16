import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors()); // Add this line
app.use(express.json()); // allows to accept JSON data in body.

const PORT = process.env.PORT || 8080;

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
