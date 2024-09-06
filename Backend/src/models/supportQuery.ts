import { Schema, model, Document } from "mongoose";

export interface ISupportQuery extends Document {
  userId: Schema.Types.ObjectId;
  subject: string;
  category: string;
  description: string;
  image?: string;
  status: string;
  createdAt: Date;
}

const SupportQuerySchema = new Schema<ISupportQuery>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    default: "Open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ISupportQuery>("SupportQuery", SupportQuerySchema);
