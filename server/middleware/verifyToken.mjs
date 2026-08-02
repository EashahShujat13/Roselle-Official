import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/environment.mjs";

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send({ message: "Token Required" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded._id;
        req.tokenToRemove = token;

        next();
    } catch (e) {
        res.status(401).send({
            message: "Invalid Token"
        });
    }
};

export default verifyToken;