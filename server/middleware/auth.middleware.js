// server/middleware/auth.middleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "MySecretKeyForJWT123";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  // Expect header: Authorization: Bearer <token>
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, email, iat, exp }
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
