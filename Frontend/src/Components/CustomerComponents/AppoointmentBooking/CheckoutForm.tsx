import React, { useState } from "react";
import {
  useStripe,
  useElements,
  AddressElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { Box, Button, Typography } from "@mui/material";
import axiosInstance from "../../../config/axiosInstance";
import { paymentsUrls } from "../../../urls/urls";
import Loader from "../../../widgets/Loader";

// interface CustomCheckoutProps {
//   salonId?: string;
//   handleSuccessPayment: () => void;
// }

const CustomCheckout: React.FC<any> = ({
  handleSuccessPayment,
  selectedServiceRate,
  appointmentBookingFormState,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not loaded properly.");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    const addressElement = elements.getElement(AddressElement);

    if (!cardElement || !addressElement) {
      setError("Card or address information is incomplete.");
      return;
    }

    setLoading(true);

    try {
      const { name, address } = (await addressElement.getValue()).value;

      const {
        data: { clientSecret },
      } = await axiosInstance.post(paymentsUrls.createPaymentIntent, {
        amount: selectedServiceRate * 100,
        currency: "inr",
        name,
        address,
        metadata: {
          appointmentBookingFormState,
        },
      });

      const { error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name,
              address,
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || "Payment failed");
      } else {
        handleSuccessPayment();
      }
    } catch (error) {
      setError("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    complete: {
      color: "#4caf50",
    },
    invalid: {
      color: "#9e2146",
      iconColor: "#9e2146",
    },
  };

  return (
    <Box sx={{ width: "95%" }}>
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>
      <Box mb={3}>
        <Typography variant="body2" gutterBottom>
          Card Number
        </Typography>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            mb: 2,
          }}
        >
          <CardNumberElement options={{ style: cardStyle }} />
        </Box>
      </Box>
      <Box mb={3}>
        <Typography variant="body2" gutterBottom>
          Expiry Date
        </Typography>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            mb: 2,
          }}
        >
          <CardExpiryElement options={{ style: cardStyle }} />
        </Box>
      </Box>
      <Box mb={3}>
        <Typography variant="body2" gutterBottom>
          CVC
        </Typography>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            mb: 2,
          }}
        >
          <CardCvcElement options={{ style: cardStyle }} />
        </Box>
      </Box>
      <Typography variant="h6" gutterBottom>
        Billing Address
      </Typography>
      <Box mb={3}>
        <AddressElement
          options={{
            mode: "billing",
            defaultValues: {
              name: "",
              address: {
                line1: "",
                city: "",
                state: "Maharashtra",
                postal_code: "",
                country: "IN",
              },
            },
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={(event: any) => handleSubmit(event)}
        disabled={loading || !stripe}
        fullWidth
      >
        {loading ? "Processing..." : "Pay"}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {loading && <Loader />}
    </Box>
  );
};

export default CustomCheckout;
