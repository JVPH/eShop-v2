import jwt from "jsonwebtoken";
import { users } from "../models/user.js";
import { db } from "../config/db.js";
import { eq } from "drizzle-orm";
import { JWT_SECRET } from "../utils/config.js";

const protect = async (req, res, next) => {
  let token;
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7);

    const decoded = jwt.verify(token, JWT_SECRET);

    const resultData = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.id));

    const user = resultData[0];

    if (user) {
      req.user = user;
    } else {
      res.status(401);
      throw new Error("User not found");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  next();
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, Not Admin");
  }
};

export { protect, adminOnly };
