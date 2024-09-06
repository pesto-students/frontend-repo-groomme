import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import Salon from "../models/salon";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendResetEmail } from "../config/nodemailerConfig";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, userType } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      userType,
    });
    await user.save();

    if (userType === "salon") {
      const salon = new Salon({
        userId: user._id,
        salonName: "",
        description: "",
        address: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
        services: [
          {
            name: "",
            description: "",
            rate: 0,
          },
          {
            name: "",
            description: "",
            rate: 0,
          },
          {
            name: "",
            description: "",
            rate: 0,
          },
          {
            name: "",
            description: "",
            rate: 0,
          },
          {
            name: "",
            description: "",
            rate: 0,
          },
          {
            name: "",
            description: "",
            rate: 0,
          },
        ],
        mapLocationLink: "",
        staff: [
          {
            fullname: "",
            description: "",
            specialties: ["", "", "", ""],
            profilePic: "",
          },
          {
            fullname: "",
            description: "",
            specialties: ["", "", "", ""],
            profilePic: "",
          },
          {
            fullname: "",
            description: "",
            specialties: ["", "", "", ""],
            profilePic: "",
          },
          {
            fullname: "",
            description: "",
            specialties: ["", "", "", ""],
            profilePic: "",
          },
        ],
        salonImages: [
          {
            url: "",
          },
          {
            url: "",
          },
          {
            url: "",
          },
          {
            url: "",
          },
          {
            url: "",
          },
          {
            url: "",
          },
          {
            url: "",
          },
        ],
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
        slotGeneration: {
          openingClosingHours: {
            monday: {
              opening: 0,
              closing: 0,
            },
            tuesday: {
              opening: 0,
              closing: 0,
            },
            wednesday: {
              opening: 0,
              closing: 0,
            },
            thursday: {
              opening: 0,
              closing: 0,
            },
            friday: {
              opening: 0,
              closing: 0,
            },
            saturday: {
              opening: 0,
              closing: 0,
            },
            sunday: {
              opening: 0,
              closing: 0,
            },
          },
          slotInterval: 0,
        },
      });

      await salon.save();
    }

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid Credentials",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      userDetails: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
      },
      auth_token: token,
      message: "User successfully logged in",
    });
  } catch (error) {
    console.error("error-login", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  res.status(200).json({
    userId: req.userId,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "User logged out",
  });
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = await bcrypt.hash(resetToken, 8);

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    await sendResetEmail(email, resetToken);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("error forgotPasswordController", error);
    res.status(500).json({ message: "Error processing request", error });
  }
};
export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find the user by the reset token
    const user = await User.findOne({
      resetPasswordToken: { $exists: true },
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token has not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Verify the token matches
    const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isTokenValid) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = password;
    user.resetPasswordToken = ""; // Clear the reset token
    user.resetPasswordExpires = -1; // Clear the expiry date
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error });
  }
};

export const updatePasswordController = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 8);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
