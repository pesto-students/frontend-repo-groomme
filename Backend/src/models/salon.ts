import mongoose, { Document, Schema, Types } from "mongoose";

interface ICoordinates extends Document {
  latitude: number;
  longitude: number;
}

interface IStaff extends Document {
  fullname: string;
  description: string;
  specialties: string[];
  profilePic: string;
}

interface IService extends Document {
  name: string;
  description: string;
  rate: number;
  category: string;
}

interface ISalonImage extends Document {
  url: string;
}

export interface IOpeningClosingHours {
  opening: number;
  closing: number;
}

export interface ISlotGeneration extends Document {
  slotInterval: number;
  openingClosingHours: {
    monday: IOpeningClosingHours;
    tuesday: IOpeningClosingHours;
    wednesday: IOpeningClosingHours;
    thursday: IOpeningClosingHours;
    friday: IOpeningClosingHours;
    saturday: IOpeningClosingHours;
    sunday: IOpeningClosingHours;
  };
}

interface IAddress extends Document {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface ISalon extends Document {
  userId: Types.ObjectId;
  salonName: string;
  description: string;
  address: IAddress;
  services: IService[];
  mapLocationLink: string;
  staff: Types.DocumentArray<IStaff>;
  salonImages: ISalonImage[];
  coordinates: ICoordinates;
  slotGeneration: ISlotGeneration;
}

function arrayLimitStaffSpecialities(val: string[]) {
  return val.length <= 4;
}

function arrayLimitStaff(val: string[]) {
  return val.length <= 4;
}

function arrayLimitServices(val: string[]) {
  return val.length <= 6;
}

function arrayLimitSalonImages(val: string[]) {
  return val.length <= 10;
}

const coordinatesSchema: Schema<ICoordinates> = new Schema({
  latitude: {
    type: Number,
    validate: {
      validator: function (v: number) {
        return v >= -90 && v <= 90;
      },
      message: "Latitude must be between -90 and 90",
    },
  },
  longitude: {
    type: Number,
    validate: {
      validator: function (v: number) {
        return v >= -180 && v <= 180;
      },
      message: "Longitude must be between -180 and 180",
    },
  },
});

const addressSchema: Schema<IAddress> = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
});

const staffSchema: Schema<IStaff> = new Schema({
  fullname: { type: String },
  description: { type: String },
  specialties: {
    type: [String],
    validate: [arrayLimitStaffSpecialities, "{PATH} exceeds the limit of 4"],
  },
  profilePic: { type: String },
});

const serviceSchema: Schema<IService> = new Schema({
  name: { type: String },
  description: { type: String },
  rate: { type: Number },
  category: { type: String },
});

const salonImageSchema: Schema<ISalonImage> = new Schema({
  url: { type: String },
});

const openingClosingHoursSchema: Schema<IOpeningClosingHours> = new Schema({
  opening: { type: Number },
  closing: { type: Number },
});

const slotGenerationSchema: Schema<ISlotGeneration> = new Schema({
  slotInterval: { type: Number },
  openingClosingHours: {
    monday: { type: openingClosingHoursSchema },
    tuesday: { type: openingClosingHoursSchema },
    wednesday: { type: openingClosingHoursSchema },
    thursday: { type: openingClosingHoursSchema },
    friday: { type: openingClosingHoursSchema },
    saturday: { type: openingClosingHoursSchema },
    sunday: { type: openingClosingHoursSchema },
  },
});

const salonSchema: Schema<ISalon> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  salonName: { type: String },
  description: { type: String },
  address: { type: addressSchema },
  services: {
    type: [serviceSchema],
    validate: [arrayLimitServices, "{PATH} exceeds the limit of 6"],
  },
  mapLocationLink: { type: String },
  staff: {
    type: [staffSchema],
    validate: [arrayLimitStaff, "{PATH} exceeds the limit of 4"],
  },
  salonImages: {
    type: [salonImageSchema],
    validate: [arrayLimitSalonImages, "{PATH} exceeds the limit of 10"],
  },
  coordinates: {
    type: coordinatesSchema,
  },
  slotGeneration: {
    type: slotGenerationSchema,
  },
});

const Salon = mongoose.model<ISalon>("Salon", salonSchema);

export default Salon;
