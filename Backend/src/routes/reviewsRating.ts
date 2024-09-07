import express, { Request, Response } from "express";
import Review from "../models/reviewsRating";
import mongoose from "mongoose";
import User from "../models/user";
import { validateToken } from "../middleware/auth";

const router = express.Router();

router.post("/reviews", validateToken, async (req: Request, res: Response) => {
  try {
    const {
      salonId,
      userId,
      rating,
      comment,
      services,
      staff,
      valueForMoney,
      cleanliness,
    } = req.body;

    const existingReview = await Review.findOne({ salonId, userId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "Review already exists for this salon" });
    }

    const review = new Review({
      salonId,
      userId,
      rating,
      comment,
      services,
      staff,
      valueForMoney,
      cleanliness,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
});

router.get(
  "/salons/:salonId/reviews",
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const { salonId } = req.params;
      const { userId } = req;

      const reviews = await Review.find({ salonId }).populate("userId", "name");
      const enhancedReviews = await Promise.all(
        reviews.map(async (review) => {
          const user = await User.findById(review.userId).select(
            "_id email firstName lastName"
          );
          function deleteProperty(obj: any, key: any) {
            if (obj && key in obj) {
              delete obj[key];
            }
          }
          const detailsToSend = {
            ...review.toObject(),
            userDetails: user || { _id: "" },
          };
          if (detailsToSend) {
            deleteProperty(detailsToSend, "userId");
          }
          return detailsToSend;
        })
      );
      if (userId) {
        const userReviewIndex = enhancedReviews.findIndex((review) => {
          console.log(
            "first",
            review.userDetails._id.toString() === userId.toString()
          );
          return review.userDetails._id.toString() === userId.toString();
        });
        console.log("userReviewIndex", userReviewIndex);
        if (userReviewIndex > -1) {
          // Move the user's review to the top
          const [userReview] = enhancedReviews.splice(userReviewIndex, 1);
          enhancedReviews.unshift(userReview);
        }
      }

      const aggregateData = await Review.aggregate([
        { $match: { salonId: new mongoose.Types.ObjectId(salonId) } },
        {
          $group: {
            _id: "$salonId",
            avgRating: { $avg: "$rating" },
            avgServices: { $avg: "$services" },
            avgStaff: { $avg: "$staff" },
            avgValueForMoney: { $avg: "$valueForMoney" },
            avgCleanliness: { $avg: "$cleanliness" },
          },
        },
      ]);

      const averages = aggregateData[0] || {
        avgRating: 0,
        avgServices: 0,
        avgStaff: 0,
        avgValueForMoney: 0,
        avgCleanliness: 0,
      };

      res.status(200).json({ enhancedReviews, averages });
    } catch (error) {
      res.status(500).json({ message: "Error fetching reviews", error });
    }
  }
);

router.put(
  "/reviews/:reviewId",
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const { reviewId } = req.params;
      const { rating, comment, services, staff, valueForMoney, cleanliness } =
        req.body;

      const updatedReview = await Review.findOneAndUpdate(
        { _id: reviewId },
        {
          rating: rating || undefined,
          comment: comment || undefined,
          services: services || undefined,
          staff: staff || undefined,
          valueForMoney: valueForMoney || undefined,
          cleanliness: cleanliness || undefined,
        },
        { new: true, runValidators: true }
      );

      if (!updatedReview) {
        return res
          .status(404)
          .json({ message: "Review not found or unauthorized" });
      }

      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json({ message: "Error updating review", error });
    }
  }
);

export default router;
