import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

import authRouter from "./routes/auth.js";
import galleryRouter  from "./routes/gallery.js";
import reviewsRouter  from "./routes/reviews.js";
import servicesRouter from "./routes/services.js";
import brandsRouter   from "./routes/brands.js";
import heroRouter     from "./routes/hero.js";
import aboutRouter    from "./routes/about.js";
import faqRouter      from "./routes/faq.js";
import contactRouter  from "./routes/contact.js";
import uploadRouter     from "./routes/upload.js";
import legalRouter      from "./routes/legal.js";
import homeSlidesRouter from "./routes/homeSlides.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",     authRouter);
app.use("/api/gallery",  galleryRouter);
app.use("/api/reviews",  reviewsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/brands",   brandsRouter);
app.use("/api/hero",     heroRouter);
app.use("/api/about",    aboutRouter);
app.use("/api/faq",      faqRouter);
app.use("/api/contact",  contactRouter);
app.use("/api/upload",       uploadRouter);
app.use("/api/legal",        legalRouter);
app.use("/api/home-slides",  homeSlidesRouter);

app.get("/health", (_, res) => res.json({ ok: true }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT ?? 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
