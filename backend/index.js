import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import AuthRouters from "./routes/auth.routes.js";
import ProductRouters from "./routes/product.routes.js";
import OrderRouters from "./routes/order.routes.js";
import PaymentRouters from "./routes/payment.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import path from "path";
const app = express();
app.use(cookieParser());
dotenv.config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
const __dirname = path.resolve();
//CSP settings
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "img-src": ["'self'", "https:", "data:"],
      "frame-ancestors": ["'self'"],
      "frame-src": ["'self'", "https://maps.google.com"],
    },
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", AuthRouters);
app.use("/api", ProductRouters);
app.use("/api", OrderRouters);
app.use("/api", PaymentRouters);

app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("mongodb is connected");
    app.listen(process.env.PORT, () =>
      console.log(`${process.env.PORT} server is running`)
    );
  })
  .catch((error) => console.log("server error", error));
