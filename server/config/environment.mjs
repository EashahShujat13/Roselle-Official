import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;
export  const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT ;
export const EMAIL = process.env.EMAIL;
export const APP_PASSWORD = process.env.APP_PASSWORD;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;