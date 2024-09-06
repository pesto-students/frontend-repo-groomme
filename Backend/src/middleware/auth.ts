import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const validateRegistration = [
  check("firstName", "First Name is required").isString(),
  check("lastName", "Last Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
  check("userType", "User type is required").isIn(["customer", "salon"]),
  check("salonName")
    .optional()
    .custom((value, { req }) => {
      if (req.body.userType === "salon" && !value) {
        throw new Error("Salon name is required for salon users");
      }
      if (req.body.userType === "customer" && value) {
        throw new Error("Salon name should be empty for customer users");
      }
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  check("email", "Email is required").isEmail(),
  check(
    "password",
    "Password length should be a minimum of 6 characters"
  ).isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array(),
      });
    }
    next();
  },
];

export const validateToken = [
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
    const token = authHeader.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      req.userId = (decoded as JwtPayload).userId;
      next();
    } catch (error) {
      console.error("error-validateToken", error);
      return res.status(401).json({
        message: "unauthorized",
      });
    }
  },
];
