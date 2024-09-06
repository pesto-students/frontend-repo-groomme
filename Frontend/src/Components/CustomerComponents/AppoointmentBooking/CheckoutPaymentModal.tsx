import * as React from "react";
import {
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";
import Payments from "./Payments";
import { SalonInformationType } from "../../../types/salon";
import CheckoutDetails from "./CheckoutDetails";
import CloseIcon from "@mui/icons-material/Close";

interface FormState {
  salonId: string;
  date: string;
  timeSlot: string;
  service: string;
  preference: string;
  notes: string;
}
export default function CheckoutPaymentModal({
  open,
  handleClose,
  selectedServiceRate,
  appointmentBookingFormState,
  salonDetails,
  handleSuccessPayment,
}: {
  open: boolean;
  handleClose: () => void;
  selectedServiceRate: number;
  appointmentBookingFormState: FormState;
  salonDetails: SalonInformationType;
  handleSuccessPayment: () => void;
}) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"lg"}>
        <DialogTitle>Checkout</DialogTitle>{" "}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6" gutterBottom>
                Appointment Details
              </Typography>
              <CheckoutDetails
                selectedServiceRate={selectedServiceRate}
                appointmentBookingFormState={appointmentBookingFormState}
                salonDetails={salonDetails}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Payments
                selectedServiceRate={selectedServiceRate}
                appointmentBookingFormState={appointmentBookingFormState}
                handleSuccessPayment={handleSuccessPayment}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
