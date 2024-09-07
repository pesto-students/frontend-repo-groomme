import mongoose, { Document, Schema, Types } from "mongoose";

// Define the interfaces for referenced models

// Define the interface for Appointment
interface IAppointment extends Document {
  userId: Types.ObjectId;
  salonId: Types.ObjectId;
  serviceRequestedId: Types.ObjectId; // Updated field
  staffId: Types.ObjectId; // Updated field
  date: Date;
  time: string;
  status: "pending" | "approved" | "cancelled";
  notes?: string;
}

// Define the Appointment schema
const appointmentSchema: Schema<IAppointment> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "User ID is required"],
    },
    salonId: {
      type: Schema.Types.ObjectId,
      ref: "Salon", // Reference to the Salon model
      required: [true, "Salon ID is required"],
    },
    serviceRequestedId: {
      type: Schema.Types.ObjectId,
      ref: "Service", // Reference to the Service model
      required: [true, "Service requested ID is required"],
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "Staff", // Reference to the Staff model
      required: [true, "Staff ID is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled", "completed"],
      default: "pending",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);

export default Appointment;
