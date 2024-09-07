import { distance } from "@turf/turf";
import Salon from "../models/salon";
import User from "../models/user";
import { Request, Response } from "express";

export const createSalonController = async (req: Request, res: Response) => {
  const isUserExisting = await User.findOne({ _id: req.userId });
  if (!isUserExisting) {
    return res.status(400).json({ error: "User Not found" });
  }
  if (isUserExisting && isUserExisting.userType === "customer") {
    return res.status(400).json({
      error:
        "User type is 'customer'. Salons cannot be created with this account type. Please register as a 'proprietor' to create a salon.",
    });
  }
  const isSalonExisting = await Salon.findOne({ userId: req.userId });
  if (isSalonExisting) {
    return res.status(400).json({ error: "Salon already exists" });
  }
  const {
    salonName,
    description,
    address,
    services,
    mapLocationLink,
    staff,
    salonImages,
    coordinates,
    slotGeneration,
  } = req.body;
  const salon = new Salon({
    userId: req.userId,
    salonName,
    description,
    address,
    services,
    mapLocationLink,
    staff,
    salonImages,
    coordinates,
    slotGeneration,
  });

  try {
    const savedSalon = await salon.save();
    res.status(201).json(savedSalon);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const getSalonController = async (req: Request, res: Response) => {
  try {
    const salon = await Salon.findOne({ userId: req.userId });
    if (!salon) return res.status(404).json({ error: "Salon not found" });
    res.json(salon);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const updateSalonController = async (req: Request, res: Response) => {
  const {
    salonName,
    description,
    address,
    services,
    mapLocationLink,
    staff,
    salonImages,
    coordinates,
    slotGeneration,
  } = req.body;

  try {
    const updatedSalon = await Salon.findOneAndUpdate(
      { userId: req.userId },
      {
        salonName,
        description,
        address,
        services,
        mapLocationLink,
        staff,
        salonImages,
        coordinates,
        slotGeneration,
      },
      { new: true, runValidators: true }
    );

    if (!updatedSalon)
      return res.status(404).json({ error: "Salon not found" });
    res.json(updatedSalon);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const deleteSalonController = async (req: Request, res: Response) => {
  try {
    const deletedSalon = await Salon.findOneAndDelete({ userId: req.userId });
    if (!deletedSalon)
      return res.status(404).json({ error: "Salon not found" });
    res.json({ message: "Salon deleted successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const getSalonsListController = async (req: Request, res: Response) => {
  const { longitude, latitude } = req.body;

  try {
    const salons = await Salon.find();
    const userCoords = [longitude, latitude];

    const salonsWithDistance = salons.map((salon) => {
      const salonCoords = [
        salon.coordinates.longitude,
        salon.coordinates.latitude,
      ];
      const dist = distance(userCoords, salonCoords, { units: "kilometers" });

      return { ...salon.toObject(), distance: dist };
    });

    salonsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(salonsWithDistance);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
export const getServiceCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const serviceCategories = [
      "Haircuts & Styling",
      "Coloring",
      "Hair Treatments",
      "Texturizing",
      "Extensions & Wigs",
      "Bridal Services",
      "Makeup",
      "Nail Care",
      "Waxing",
      "Facials",
      "Massage Therapy",
      "Body Treatments",
      "Men's Grooming",
      "Children's Services",
      "Spa Packages",
      "Hair & Scalp Analysis",
      "Tattoo & Piercing",
      "Eyelash & Eyebrow Services",
      "Specialty Services",
      "Personalized Consultations",
    ];

    res.json(serviceCategories);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const getSalonPreviewController = async (
  req: Request,
  res: Response
) => {
  const { salonId } = req.query;
  try {
    const salon = await Salon.findOne({ _id: salonId });
    if (!salon) return res.status(404).json({ error: "Salon not found" });
    res.json(salon);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
