import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/environment.mjs";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        message: "Token Required",
      });
    }

    // Authorization header:
    // Bearer <token>
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).send({
        message: "Token Required",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded._id;
    req.tokenToRemove = token;

    next();
  } catch (e) {
    console.log("JWT VERIFY ERROR:", e.message);

    return res.status(401).send({
      message: "Invalid Token",
    });
  }
};

export default verifyToken;