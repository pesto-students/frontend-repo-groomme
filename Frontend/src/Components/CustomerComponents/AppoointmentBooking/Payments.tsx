import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk as string);

function Payments({
  handleSuccessPayment,
  selectedServiceRate,
  appointmentBookingFormState,
}: any) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        handleSuccessPayment={handleSuccessPayment}
        selectedServiceRate={selectedServiceRate}
        appointmentBookingFormState={appointmentBookingFormState}
      />
    </Elements>
  );
}

export default Payments;
