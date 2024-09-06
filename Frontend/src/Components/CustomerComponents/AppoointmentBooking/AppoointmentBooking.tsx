// src/BookingForm.tsx
import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import { SalonInformationType } from "../../../types/salon";
import { toast } from "react-toastify";
import { generateSlotsForNextDay } from "../../../helpers/generateSlotForNextDay";
import { bookAppointmentService, formatTime } from "../../../services/salons";
import { useNavigate } from "react-router-dom";
import { customerRouteConstants } from "../../../routes/routeConstants";

import CheckoutPaymentModal from "./CheckoutPaymentModal";
import axiosInstance from "../../../config/axiosInstance";

interface FormState {
  salonId: string;
  date: string;
  timeSlot: string;
  service: string;
  preference: string;
  notes: string;
}

interface FormErrors {
  salonId: string;
  date: string;
  timeSlot: string;
  service: string;
  preference: string;
  notes?: string;
}

const BookingForm = ({
  salonDetails,
}: {
  salonDetails: SalonInformationType;
}) => {
  const navigate = useNavigate();
  const [nextDayAvailableSlots, setNextDayAvailableSlots] = useState<any>({
    time: [],
  });

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getNextDay = (): string => {
    const currentDay = new Date()
      .toLocaleString("en-us", { weekday: "long" })
      .toLowerCase();
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    const currentIndex = days.indexOf(currentDay.toLowerCase());
    const nextIndex = (currentIndex + 1) % days.length;
    return days[nextIndex];
  };
  const [selectedServiceRate, setSelectedServiceRate] = useState(0);
  const [appointmentBookingFormState, setAppointmentBookingFormState] =
    useState<FormState>({
      salonId: salonDetails._id,
      date: getTomorrowDate(),
      timeSlot: "",
      service: "",
      preference: "",
      notes: "",
    });

  useEffect(() => {
    setAppointmentBookingFormState({
      ...appointmentBookingFormState,
      salonId: salonDetails._id,
    });
  }, [salonDetails._id]);
  const [appointmentBookingFormErrors, setAppointmentBookingFormErrors] =
    useState<FormErrors>({
      salonId: "",
      date: "",
      timeSlot: "",
      service: "",
      preference: "",
      notes: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setAppointmentBookingFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors: FormErrors = {
      salonId: "",
      date: "",
      timeSlot: "",
      service: "",
      preference: "",
    };
    if (!appointmentBookingFormState.date) errors.date = "Date is required.";
    if (!appointmentBookingFormState.timeSlot)
      errors.timeSlot = "Time slot is required.";
    if (!appointmentBookingFormState.service)
      errors.service = "Service is required.";
    if (!appointmentBookingFormState.preference)
      errors.preference = "Stylist Preference is required.";
    if (!appointmentBookingFormState.salonId) {
      toast.error("Salon Id Not Found");
      errors.preference = "Stylist Preference is required.";
    }

    setAppointmentBookingFormErrors(errors);

    return (
      errors.date === "" &&
      errors.timeSlot === "" &&
      errors.service === "" &&
      errors.preference === ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleClickOpenCheckoutPaymentModal();
    }
  };

  async function handleSuccessPayment() {
    await bookAppointmentService(appointmentBookingFormState);
    handleClear();
    navigate(customerRouteConstants.appointments);
  }
  const handleClear = () => {
    setAppointmentBookingFormState({
      salonId: salonDetails._id,
      date: getTomorrowDate(),
      timeSlot: "",
      service: "",
      preference: "",
      notes: "",
    });
    setAppointmentBookingFormErrors({
      salonId: "",
      date: "",
      timeSlot: "",
      service: "",
      preference: "",
    });
  };

  const renderSlots = async () => {
    if (salonDetails._id !== "") {
      const nextDay = getNextDay();
      const openingTime =
        salonDetails.slotGeneration.openingClosingHours[nextDay].opening;
      const closingTime =
        salonDetails.slotGeneration.openingClosingHours[nextDay].closing;
      const slotInterval = salonDetails.slotGeneration.slotInterval;
      const slots: any = generateSlotsForNextDay(
        new Date(),
        formatTime(parseInt(openingTime)),
        formatTime(parseInt(closingTime)),
        slotInterval
      );
      const { data } = await axiosInstance.get("/appointments/booked-tomorrow");

      const disableSet = new Set(data);

      const updatedTimeSlots = slots.time.map((slot: any) => ({
        ...slot,
        disable: disableSet.has(slot.startTime),
      }));
      const updatedSlots = {
        ...slots,
        time: updatedTimeSlots,
      };

      setNextDayAvailableSlots(updatedSlots);
    }
  };
  useEffect(() => {
    renderSlots();
  }, [salonDetails]);
  const MenuProps: any = {
    PaperProps: {
      style: {
        maxHeight: 100, // Adjust the height as needed
        width: 250, // Adjust the width as needed
      },
    },
  };

  const [openCheckoutPaymentModal, setOpenCheckoutPaymentModal] =
    React.useState(false);

  const handleClickOpenCheckoutPaymentModal = () => {
    setOpenCheckoutPaymentModal(true);
  };

  const handleCloseCheckoutPaymentModal = () => {
    setOpenCheckoutPaymentModal(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        gap: 3,
        backgroundColor: "#FFF",
        mt: 15,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Schedule Your Salon Visit
      </Typography>

      <Tooltip title="Only Tomorrow's date can be selected">
        <Box>
          <TextField
            id="date"
            name="date"
            label="Preferred Appointment Date"
            type="date"
            value={appointmentBookingFormState.date}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            error={!!appointmentBookingFormErrors.date}
            helperText={appointmentBookingFormErrors.date}
            disabled
          />
        </Box>
      </Tooltip>

      <TextField
        id="timeSlot"
        name="timeSlot"
        label="Preferred Appointment Time Slot"
        select
        value={appointmentBookingFormState.timeSlot}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
        error={!!appointmentBookingFormErrors.timeSlot}
        helperText={appointmentBookingFormErrors.timeSlot}
        SelectProps={MenuProps}
      >
        {nextDayAvailableSlots && nextDayAvailableSlots.time?.length > 0 ? (
          nextDayAvailableSlots.time.map((slot: any) => {
            return (
              <MenuItem disabled={slot.disable} value={slot.startTime}>
                {`${slot.startTime} - ${slot.endTime} `}
                {slot.disable && (
                  <Typography sx={{ fontSize: 10, fontStyle: "italic" }}>
                    (Already Booked)
                  </Typography>
                )}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem>Slots Not Available</MenuItem>
        )}
      </TextField>

      <TextField
        id="service"
        name="service"
        label="Service Requested"
        select
        value={appointmentBookingFormState.service}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
        error={!!appointmentBookingFormErrors.service}
        helperText={appointmentBookingFormErrors.service}
      >
        {salonDetails.services.map((service) => {
          return (
            <MenuItem
              onClick={() => {
                setSelectedServiceRate(service.rate);
              }}
              value={service._id}
            >
              {service.name}
            </MenuItem>
          );
        })}
      </TextField>

      <TextField
        id="preference"
        name="preference"
        label="Stylist Preference"
        select
        value={appointmentBookingFormState.preference}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
        error={!!appointmentBookingFormErrors.preference}
        helperText={appointmentBookingFormErrors.preference}
      >
        {salonDetails.staff.map((staff) => {
          return <MenuItem value={staff._id}>{staff.fullname}</MenuItem>;
        })}
      </TextField>

      <TextField
        id="notes"
        name="notes"
        label="Special Requests/Notes"
        multiline
        rows={4}
        value={appointmentBookingFormState.notes}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1 }}
        InputLabelProps={{ shrink: true }}
      />
      <Typography sx={{ color: "#d4740f" }} variant="body1">
        Rate
        <Typography sx={{ color: "#d4740f" }} variant="h5">
          ₹ {selectedServiceRate}
        </Typography>
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#d4740f" }}
        >
          Confirm Booking
        </Button>
        <Button
          type="button"
          variant="outlined"
          sx={{ color: "#d4740f", border: "1px solid #d4740f" }}
          onClick={handleClear}
        >
          Cancel
        </Button>
      </Box>

      {openCheckoutPaymentModal && (
        <CheckoutPaymentModal
          open={openCheckoutPaymentModal}
          handleClose={handleCloseCheckoutPaymentModal}
          selectedServiceRate={selectedServiceRate}
          appointmentBookingFormState={appointmentBookingFormState}
          salonDetails={salonDetails}
          handleSuccessPayment={handleSuccessPayment}
        />
      )}
    </Box>
  );
};

export default BookingForm;
