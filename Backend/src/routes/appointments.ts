import express, { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import Appointment from "../models/appointments";
import "../documentation/appointments.swagger";
import { validateToken } from "../middleware/auth";
import User from "../models/user";
import Salon from "../models/salon";

const router = express.Router();

interface BookAppointmentRequest extends Request {
  body: {
    userId: string;
    salonId: string;
    serviceRequestedId: string;
    staffId: string;
    date: string;
    time: string;
    notes?: string;
    rate: number;
  };
}
interface ISalon {
  _id: string;
}

router.post(
  "/book",
  validateToken,
  async (req: BookAppointmentRequest, res: Response) => {
    const { salonId, serviceRequestedId, staffId, date, time, notes, rate } =
      req.body;
    const { userId } = req;

    const user = await User.findById(userId).select("userType");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const salon = await Salon.findById(salonId);
    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    try {
      const appointment = new Appointment({
        userId,
        salonId,
        serviceRequestedId,
        staffId,
        date,
        time,
        notes,
        rate,
      });

      await appointment.save();
      res
        .status(201)
        .json({ message: "Appointment booked successfully", appointment });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(error.errors).map((err) => err.message);
        res
          .status(400)
          .json({ message: "Validation failed", errors: messages });
      } else {
        res.status(500).json({
          message: "Failed to book appointment",
          error: error instanceof Error ? error.message : error,
        });
      }
    }
  }
);

router.patch("/:id/approve", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment approved", appointment });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve appointment",
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.patch("/:id/cancel", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment cancelled", appointment });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel appointment",
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.patch("/:id/complete", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment completed", appointment });
  } catch (error) {
    res.status(500).json({
      message: "Failed to complete appointment",
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.get(
  "/appointmentsList",
  validateToken,
  async (req: Request, res: Response) => {
    const { userId } = req;
    const user = await User.findById(userId);
    const salonIdFromUser = await Salon.find({ userId: userId });

    const salon = salonIdFromUser[0] as ISalon;

    let filter = {};
    if (user && user.userType === "customer") {
      filter = { userId: userId };
    }
    if (user && user.userType === "salon") {
      filter = { salonId: salon._id };
    }

    try {
      const appointments = await Appointment.find(filter);

      const enhancedAppointments = await Promise.all(
        appointments.map(async (appointment) => {
          const user = await User.findById(appointment.userId).select(
            "_id email firstName lastName"
          );

          const salon = await Salon.findById(appointment.salonId);
          const serviceRequestedDetails = salon?.services.find((user: any) =>
            user._id.equals(appointment.serviceRequestedId)
          );
          const stylistDetails = salon?.staff.find((user: any) => {
            return user._id.equals(appointment.staffId);
          });

          const temp = {
            _id: salon ? salon._id : "",
            salonName: salon ? salon.salonName : "",
            address: salon ? salon.address : "",
            mapLocationLink: salon ? salon.mapLocationLink : "",
            coordinates: salon ? salon.coordinates : "",
          };

          function deleteProperty(obj: any, key: any) {
            if (obj && key in obj) {
              delete obj[key];
            }
          }
          const detailsToSend = {
            ...appointment.toObject(),
            userDetails: user || {},
            salonDetails: temp || {},
            serviceRequestedDetails: serviceRequestedDetails || {},
            stylistDetails: stylistDetails || {},
          };
          if (detailsToSend) {
            deleteProperty(detailsToSend, "userId");
            deleteProperty(detailsToSend, "salonId");
            deleteProperty(detailsToSend, "staffId");
            deleteProperty(detailsToSend, "serviceRequestedId");
          }

          return detailsToSend;
        })
      );

      res.status(200).json({ appointments: enhancedAppointments });
    } catch (error) {
      res.status(500).json({
        message: "Failed to get appointments",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
);

router.get(
  "/appointments/booked-tomorrow",
  async (req: Request, res: Response) => {
    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
      const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));

      const appointments = await Appointment.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        status: { $ne: "completed" }, // Exclude appointments with "completed" status
      }).select("date status time -_id"); // Select only the time field and exclude _id

      const times = appointments.map((appointment) => appointment.time);

      res.json(times);
    } catch (error) {
      console.error("Error fetching booked slots for tomorrow:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
