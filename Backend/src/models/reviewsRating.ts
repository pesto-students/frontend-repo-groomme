import mongoose, { Document, Schema } from "mongoose";

interface IReview extends Document {
  salonId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  services: number;
  staff: number;
  valueForMoney: number;
  cleanliness: number;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema<IReview>({
  salonId: { type: Schema.Types.ObjectId, ref: "Salon", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  services: { type: Number, required: true, min: 1, max: 5 },
  staff: { type: Number, required: true, min: 1, max: 5 },
  valueForMoney: { type: Number, required: true, min: 1, max: 5 },
  cleanliness: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
