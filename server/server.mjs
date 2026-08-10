import express from "express";
import { PORT } from "./config/environment.mjs";
import connectDB from "./config/db.mjs";
import cors from "cors";

import authRoutes from "./routes/authRoutes.mjs";
import productRoutes from "./routes/productRoutes.mjs";
import categoryRoutes from "./routes/categoryRoutes.mjs";

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

// Local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Vercel
export default app;