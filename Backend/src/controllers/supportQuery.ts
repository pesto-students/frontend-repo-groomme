import { Request, Response } from "express";
import { Types } from "mongoose";
import supportQuery, { ISupportQuery } from "../models/supportQuery";

export const createQueryTicketController = async (
  req: Request,
  res: Response
) => {
  const { subject, category, description, image } = req.body;
  const { userId } = req;

  try {
    const newQuery: ISupportQuery = new supportQuery({
      userId: new Types.ObjectId(userId),
      subject,
      category,
      description,
      image,
    });

    const savedQuery = await newQuery.save();

    res.json({
      success: true,
      message: "Query submitted successfully",
      data: savedQuery,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
};

export const getSupportQueriesListController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req;
  try {
    const queries = await supportQuery.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(queries);
  } catch (error) {
    console.error("Error fetching support queries:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
