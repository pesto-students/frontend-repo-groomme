import express from "express";
import {
  validateLogin,
  validateRegistration,
  validateToken,
} from "../middleware/auth";
import {
  forgotPasswordController,
  login,
  logout,
  register,
  resetPasswordController,
  updatePasswordController,
  verifyToken,
} from "../controllers/auth";
import "../documentation/Auth.swagger";

const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/validateToken", validateToken, verifyToken);
router.post("/logout", logout);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);
router.put("/update-password", validateToken, updatePasswordController);

export default router;
