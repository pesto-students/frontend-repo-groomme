import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const faqs = [
  {
    id: 1,
    question: "How do I register my salon on the platform?",
    answer:
      "To register your salon, click on the 'Register' button, fill out the required details about your salon, and submit the form.",
  },
  {
    id: 2,
    question: "Can customers book appointments online?",
    answer:
      "Yes, customers can easily book appointments online through our platform by selecting their preferred salon, service, and time slot.",
  },
  {
    id: 3,
    question: "Is there a fee to register my salon?",
    answer:
      "There is no registration fee for salons. However, we offer premium plans with additional features that salons can opt for after registration.",
  },
  {
    id: 4,
    question: "How do customers find my salon on the platform?",
    answer:
      "Your salon will appear in search results based on the criteria entered by the customer.",
  },
  {
    id: 5,
    question: "How do I manage my salon’s bookings?",
    answer:
      "You can manage all your bookings from the bookings page, where you can view upcoming appointments, approve or cancel bookings.",
  },
  //   {
  //     id: 6,
  //     question: "Can I update my salon’s information after registration?",
  //     answer:
  //       "Yes, you can update your salon's information, including services, opening hours, and contact details, at any time through your salon dashboard.",
  //   },
  //   {
  //     id: 7,
  //     question: "What if a customer cancels their appointment?",
  //     answer:
  //       "If a customer cancels their appointment, you will receive a notification, and the time slot will become available for other customers to book.",
  //   },
  //   {
  //     id: 8,
  //     question: "How do I set my salon's working hours?",
  //     answer:
  //       "You can set your salon's working hours during the registration process or update them later in the salon dashboard.",
  //   },
  //   {
  //     id: 9,
  //     question: "Can I offer discounts or promotions through the platform?",
  //     answer:
  //       "Yes, you can create and manage discounts or promotions for your services directly from your salon dashboard, which will be visible to customers when booking.",
  //   },
  //   {
  //     id: 10,
  //     question: "How do customers pay for their appointments?",
  //     answer:
  //       "Customers can pay for their appointments online through secure payment methods available on our platform, or they can choose to pay at the salon after the service.",
  //   },
];

function FaqAccordation() {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Help & Support
      </Typography>
      {faqs.map((faq: any) => {
        return (
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {faq.question}
            </AccordionSummary>
            <AccordionDetails>{faq.answer}</AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}

export default FaqAccordation;
