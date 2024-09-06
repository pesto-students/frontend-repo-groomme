import express from "express";
import multer from "multer";
import "../documentation/upload.swagger";
import { uploadToS3 } from "../controllers/uploadToS3";
import { validateToken } from "../middleware/auth";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", validateToken, upload.single("image"), uploadToS3);

export default router;
