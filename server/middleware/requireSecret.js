export function requireSecret(req, res, next) {
  const secret = req.headers["x-backend-secret"];
  if (!secret || secret !== process.env.BACKEND_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
