import express from "express";

const router = express.Router();

import "../documentation/user.swagger";
import { validateToken } from "../middleware/auth";
import { getUserDetails } from "../controllers/user";

router.post("/getUserDetails", validateToken, getUserDetails);

export default router;
