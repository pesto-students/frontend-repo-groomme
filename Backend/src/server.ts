import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import uploadRoutes from "./routes/upload";
import salonRoutes from "./routes/salon";
import appointmentRoutes from "./routes/appointments";
import paymentRoutes from "./routes/payments";
import supportRoutes from "./routes/supportQuery";
import reviewRoutes from "./routes/reviewsRating";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";
import "dotenv/config";
import { connectToDatabase } from "./config/databaseConfig";
import { PORT } from "./config/serverConfig";
import path from "path";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://groomme.onrender.com",
  "https://groommebe.onrender.com",
  "https://main--groommefe.netlify.app/",
  "https://groommefe.netlify.app/",
];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();
connectToDatabase();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/", uploadRoutes);
app.use("/salon/", salonRoutes);
app.use("/", appointmentRoutes);
app.use("/", paymentRoutes);
app.use("/support", supportRoutes);
app.use("/api", reviewRoutes);
app.use("/apiDocs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.static(path.join(__dirname, "../../Frontend/dist")));
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../Frontend/dist/index.html"));
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
