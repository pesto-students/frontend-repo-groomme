import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Salon from "../models/salon";
import { validateToken } from "../middleware/auth";
import "../documentation/salon.swagger";
import User from "../models/user";
import {
  createSalonController,
  getSalonController,
  updateSalonController,
  deleteSalonController,
  getSalonsListController,
  getSalonPreviewController,
  getServiceCategoriesController,
} from "../controllers/salon";

const router = express.Router();

router.post("/createSalon", validateToken, createSalonController);
router.get("/getSalon", validateToken, getSalonController);
router.get("/salonPreview", validateToken, getSalonPreviewController);
router.post("/getSalonsList", validateToken, getSalonsListController);
router.post("/getOpenSalonsList", getSalonsListController);
router.put("/updateSalon", validateToken, updateSalonController);
router.delete("/deleteSalon", validateToken, deleteSalonController);
router.get(
  "/getServiceCategories",
  validateToken,
  getServiceCategoriesController
);

export default router;
