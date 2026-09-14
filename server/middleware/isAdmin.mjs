import Users from "../models/user.mjs";

const isAdmin = async (req, res, next) => {
  try {
    const user = await Users.findById(req.userId).select("role");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).send({ message: "Admin access required" });
    }

    next();
  } catch (e) {
    res.status(500).send({ message: "Authorization check failed", error: e.message });
  }
};

export default isAdmin;