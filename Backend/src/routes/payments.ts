import express from "express";
const router = express.Router();
import { createPaymentIntent } from "../controllers/payments";
import "../documentation/payments.swagger";
import { validateToken } from "../middleware/auth";

router.post("/create-payment-intent", validateToken, createPaymentIntent);
export default router;
