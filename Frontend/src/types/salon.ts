export interface SalonInformationType {
  _id: string;
  userId: string;
  salonName: string;
  description: string;
  address: AddressTypes;
  services: {
    _id: string;
    name: string;
    description: string;
    rate: number;
    category: string;
  }[];
  mapLocationLink: string;
  staff: StaffType[];
  salonImages: {
    _id: string;
    url: string;
  }[];
  coordinates: {
    _id: string;
    latitude: number;
    longitude: number;
  };
  __v: number;
  slotGeneration: {
    _id: string;
    openingClosingHours: {
      [key: string]: {
        _id: string;
        opening: string;
        closing: string;
      };
    };
    slotInterval: number;
  };
}

export interface StaffType {
  _id: string;
  fullname: string;
  description: string;
  specialties: string[];
  profilePic: string;
}
export interface AddressTypes {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
