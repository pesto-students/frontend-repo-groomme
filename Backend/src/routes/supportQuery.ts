import express from "express";
import { validateToken } from "../middleware/auth";
import {
  createQueryTicketController,
  getSupportQueriesListController,
} from "../controllers/supportQuery";

const router = express.Router();

// @route   POST /api/support
// @desc    Submit a help and support query
// @access  Private
router.post("/createQuery", validateToken, createQueryTicketController);

// @route   GET /api/support/queries
// @desc    Get list of all support queries
// @access  Private (should be protected by authentication middleware)
router.get("/getQueriesList", validateToken, getSupportQueriesListController);

export default router;
