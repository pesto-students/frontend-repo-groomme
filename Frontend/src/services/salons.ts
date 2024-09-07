import { AxiosResponse } from "axios";
import axiosInstance from "../config/axiosInstance";
import { salonsUrls } from "../urls/urls";
import { SalonInformationType } from "../types/salon";
import { toast } from "react-toastify";

export const getSalonsListService = async (customerPosition: {
  longitude: number;
  latitude: number;
}) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      salonsUrls.getSalonsList,
      customerPosition
    );
    if (response.data) {
      return response.data;
    } else {
      console.error("Error getSalonsListService:", response);
      throw new Error("Error getSalonsListService");
    }
  } catch (error) {
    console.error("Error getSalonsListService", error);
    return error;
  }
};
export const getOpenSalonsListService = async (customerPosition: {
  longitude: number;
  latitude: number;
}) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      salonsUrls.getOpenSalonsList,
      customerPosition
    );
    if (response.data) {
      return response.data;
    } else {
      console.error("Error getOpenSalonsListService:", response);
      throw new Error("Error getOpenSalonsListService");
    }
  } catch (error) {
    console.error("Error getOpenSalonsListService", error);
    return error;
  }
};

export function formatTime(num: number) {
  let str = num.toString().padStart(4, "0");
  let hours = str.slice(0, 2);
  let minutes = str.slice(2);
  return `${hours}:${minutes}`;
}
export const getSalonDetailsService = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      salonsUrls.getSalonDetails
    );
    if (response.data) {
      for (let day in response.data.slotGeneration.openingClosingHours) {
        if (
          response.data.slotGeneration.openingClosingHours.hasOwnProperty(day)
        ) {
          response.data.slotGeneration.openingClosingHours[day].opening =
            formatTime(
              response.data.slotGeneration.openingClosingHours[day].opening
            );
          response.data.slotGeneration.openingClosingHours[day].closing =
            formatTime(
              response.data.slotGeneration.openingClosingHours[day].closing
            );
        }
      }

      return response.data;
    } else {
      console.error("Error getSalonDetailsService:", response);
      throw new Error("Error getSalonDetailsService");
    }
  } catch (error) {
    console.error("Error getSalonDetailsService", error);
  }
};
function timeToNumber(time: string): string {
  return time.replace(":", "").padStart(4, "0");
}

export function updateHours(data: any): any {
  const updatedOpeningClosingHours = Object.keys(
    data.openingClosingHours
  ).reduce((acc, day) => {
    const { opening, closing, _id } = data.openingClosingHours[day];

    acc[day] = {
      opening: timeToNumber(opening),
      closing: timeToNumber(closing),
      _id,
    };
    return acc;
  }, {} as any);

  return {
    ...data,
    openingClosingHours: updatedOpeningClosingHours,
  };
}
export const updateSalonDetailsService = async (
  salonDetails: SalonInformationType
): Promise<any> => {
  try {
    const { openingClosingHours } = updateHours(salonDetails.slotGeneration);

    const payload = {
      ...salonDetails,
      slotGeneration: {
        ...salonDetails.slotGeneration,
        openingClosingHours,
      },
      salonImages: Object.values(salonDetails.salonImages),
      staff: Object.values(salonDetails.staff),
      services: Object.values(salonDetails.services),
    };

    const { data } = await axiosInstance.put(
      salonsUrls.updateSalonDetails,
      payload
    );

    if (data) {
      toast.success("Details Updated Successfully");
      await getSalonDetailsService();
    }
  } catch (error) {
    toast.error("Fail to update the details.");
    console.error("Error in updateSalonDetailsService:", error);
    throw error;
  }
};

export const getSalonPreviewService = async (salonId: string) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      salonsUrls.getSalonPreview,
      {
        params: {
          salonId: salonId,
        },
      }
    );

    if (response.data) {
      return response.data;
    } else {
      console.error("Error getSalonPreviewService:", response);
      throw new Error("Error getSalonPreviewService");
    }
  } catch (error) {
    console.error("Error getSalonPreviewService", error);
    return error;
  }
};

export const bookAppointmentService = async (
  appointmentDetails: any
): Promise<any> => {
  const payload = {
    salonId: appointmentDetails.salonId,
    serviceRequestedId: appointmentDetails.service,
    staffId: appointmentDetails.preference,
    date: appointmentDetails.date,
    time: appointmentDetails.timeSlot,
    notes: appointmentDetails.notes,
  };
  try {
    const { data } = await axiosInstance.post(
      salonsUrls.bookAppointment,
      payload
    );
    if (data) {
      toast.success("Appointment Booked Successfully");
    }
  } catch (error) {
    toast.error("Fail to book the details.");
    console.error("Error in bookAppointmentService:", error);
    throw error;
  }
};

export const getBookingListService = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      salonsUrls.appointmentsList
    );

    if (response.data) {
      return response.data;
    } else {
      console.error("Error getBookingListService:", response);
      throw new Error("Error getBookingListService");
    }
  } catch (error) {
    console.error("Error getBookingListService", error);
    return error;
  }
};

export const getServiceCategories = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      salonsUrls.getServiceCategories
    );
    if (response.data) {
      return response.data;
    } else {
      console.error("Error getServiceCategories:", response);
      throw new Error("Error getServiceCategories");
    }
  } catch (error) {
    console.error("Error getServiceCategories", error);
  }
};
