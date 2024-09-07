import { SalonInformationType } from "../types/salon";

export const initialSalonInformationState: SalonInformationType = {
  _id: "",
  userId: "",
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
      _id: "",
      name: "",
      description: "",
      category: "",
      rate: 0,
    },
    {
      _id: "",
      name: "",
      description: "",
      category: "",
      rate: 0,
    },
    {
      _id: "",
      name: "",
      description: "",
      category: "",
      rate: 0,
    },
    {
      _id: "",
      name: "",
      description: "",
      category: "",
      rate: 0,
    },
    {
      _id: "",
      name: "",
      description: "",
      category: "",
      rate: 0,
    },
    {
      _id: "",
      name: "",
      description: "",
      category: "",
      rate: 0,
    },
  ],
  mapLocationLink: "",
  staff: [
    {
      _id: "",
      fullname: "",
      description: "",
      specialties: ["", "", "", ""],
      profilePic: "",
    },
    {
      _id: "",
      fullname: "",
      description: "",
      specialties: ["", "", "", ""],
      profilePic: "",
    },
    {
      _id: "",
      fullname: "",
      description: "",
      specialties: ["", "", "", ""],
      profilePic: "",
    },
    {
      _id: "",
      fullname: "",
      description: "",
      specialties: ["", "", "", ""],
      profilePic: "",
    },
  ],
  salonImages: [
    {
      _id: "",
      url: "",
    },
    {
      _id: "",
      url: "",
    },
    {
      _id: "",
      url: "",
    },
    {
      _id: "",
      url: "",
    },
    {
      _id: "",
      url: "",
    },
    {
      _id: "",
      url: "",
    },
    {
      _id: "",
      url: "",
    },
  ],
  coordinates: {
    _id: "",
    latitude: 0,
    longitude: 0,
  },
  __v: 0,
  slotGeneration: {
    _id: "",
    openingClosingHours: {
      monday: {
        _id: "",
        opening: "00:00",
        closing: "00:00",
      },
      tuesday: {
        _id: "",
        opening: "00:00",
        closing: "00:00",
      },
      wednesday: {
        _id: "",
        opening: "00:00",
        closing: "00:00",
      },
      thursday: {
        _id: "",
        opening: "00:00",
        closing: "00:00",
      },
      friday: {
        _id: "",
        opening: "00:00",
        closing: "00:00",
      },
      saturday: {
        _id: "",
        opening: "00:00",
        closing: "00:00",
      },
      sunday: {
        _id: "",
        opening: "00:00",
        closing: "00:00",
      },
    },
    slotInterval: 0,
  },
};
