import User from "../models/user";
import { Request, Response } from "express";

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId).select(
      "_id email firstName lastName userType"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
