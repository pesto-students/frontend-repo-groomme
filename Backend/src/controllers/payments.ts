import { Request, Response } from "express";
import stripe from "../config/stripeConfig";

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency, name, address, metadata } = req.body;

    if (
      !address ||
      !address.line1 ||
      !address.postal_code ||
      !address.city ||
      !address.state ||
      !address.country
    ) {
      return res
        .status(400)
        .json({ error: "Address information is incomplete." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description: "Payment for your purchase",

      shipping: {
        name: name,
        address: {
          line1: address.line1,
          postal_code: address.postal_code,
          city: address.city,
          state: address.state,
          country: address.country,
        },
      },
      metadata: { ...metadata.appointmentBookingFormState },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the payment intent." });
  }
};
