import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import AuthRouters from "./routes/auth.routes.js";
import ProductRouters from "./routes/product.routes.js";
import OrderRouters from "./routes/order.routes.js";
import AnalyticRouters from "./routes/analytic.route.js";
import PaymentRouters from "./routes/payment.routes.js";
import ContactRouters from "./routes/contact.routes.js";
import ReservationRouters from "./routes/reservation.route.js";
import CategoryRouters from "./routes/category.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import AboutRouters from "./routes/about.route.js";
import MenuRouters from "./routes/menu.route.js";
import FooterRouters from "./routes/footer.route.js";
import path from "path";
import ConnectedDatabase from "./db/mongoDb.js";
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
      "img-src": ["'self'", "https:", "data:", "https://res.cloudinary.com"],
      "frame-ancestors": ["'self'"],
      "frame-src": [
        "'self'",
        "https://maps.google.com",
        "https://www.google.com",
      ],
    },
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api", AuthRouters);
app.use("/api", ProductRouters);
app.use("/api", OrderRouters);
app.use("/api", PaymentRouters);
app.use("/api", AnalyticRouters);
app.use("/api", ContactRouters);
app.use("/api", ReservationRouters);
app.use("/api", CategoryRouters);
app.use("/api", AboutRouters);
app.use("/api", MenuRouters);
app.use("/api", FooterRouters);

app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

server.listen(process.env.PORT, () => {
  ConnectedDatabase();
  console.log(`server is running PORT:${process.env.PORT}`);
});
