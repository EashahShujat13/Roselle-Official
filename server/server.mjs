import express from "express";
import { PORT } from "./config/environment.mjs";
import connectDB from "./config/db.mjs";
import cors from "cors";

import authRoutes from "./routes/authRoutes.mjs";
import productRoutes from "./routes/productRoutes.mjs";
import categoryRoutes from "./routes/categoryRoutes.mjs";
import orderRoutes from "./routes/orderRoutes.mjs";
import wishlistRoutes from "./routes/wishlistRoutes.mjs";
import adminRoutes from "./routes/adminRoutes.mjs"


const app = express();

app.use(express.json());

app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("roselle api is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);

// Local development

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Vercel
export default app;