import React from "react";
import { Container, Typography, Link, List, ListItem } from "@mui/material";

const TermsAndConditions: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="body1">Last updated: September 06, 2024</Typography>
      <Typography variant="body1" paragraph>
        Please read these terms and conditions carefully before using Our
        Service.
      </Typography>

      <Typography variant="h2" gutterBottom>
        Interpretation and Definitions
      </Typography>

      <Typography variant="h3" gutterBottom>
        Interpretation
      </Typography>
      <Typography variant="body1" paragraph>
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in singular or
        in plural.
      </Typography>

      <Typography variant="h3" gutterBottom>
        Definitions
      </Typography>
      <Typography variant="body1" paragraph>
        For the purposes of these Terms and Conditions:
      </Typography>

      <List>
        <ListItem>
          <Typography variant="body1">
            <strong>Affiliate</strong> means an entity that controls, is
            controlled by or is under common control with a party, where
            &quot;control&quot; means ownership of 50% or more of the shares,
            equity interest or other securities entitled to vote for election of
            directors or other managing authority.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Country</strong> refers to: Maharashtra, India
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Company</strong> (referred to as either &quot;the
            Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in
            this Agreement) refers to Groomme.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Device</strong> means any device that can access the Service
            such as a computer, a cellphone or a digital tablet.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Service</strong> refers to the Website.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Terms and Conditions</strong> (also referred as
            &quot;Terms&quot;) mean these Terms and Conditions that form the
            entire agreement between You and the Company regarding the use of
            the Service. This Terms and Conditions agreement has been created
            with the help of the{" "}
            <Link
              href="https://www.freeprivacypolicy.com/free-terms-and-conditions-generator/"
              target="_blank"
            >
              Free Terms and Conditions Generator
            </Link>
            .
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Third-party Social Media Service</strong> means any services
            or content (including data, information, products or services)
            provided by a third-party that may be displayed, included or made
            available by the Service.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Website</strong> refers to Groomme, accessible from{" "}
            <Link
              href="https://groommebe.onrender.com/"
              target="_blank"
              rel="external nofollow noopener"
            >
              https://groommebe.onrender.com/
            </Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>You</strong> means the individual accessing or using the
            Service, or the company, or other legal entity on behalf of which
            such individual is accessing or using the Service, as applicable.
          </Typography>
        </ListItem>
      </List>

      <Typography variant="h2" gutterBottom>
        Acknowledgment
      </Typography>
      <Typography variant="body1" paragraph>
        These are the Terms and Conditions governing the use of this Service and
        the agreement that operates between You and the Company. These Terms and
        Conditions set out the rights and obligations of all users regarding the
        use of the Service.
      </Typography>
      <Typography variant="body1" paragraph>
        Your access to and use of the Service is conditioned on Your acceptance
        of and compliance with these Terms and Conditions. These Terms and
        Conditions apply to all visitors, users and others who access or use the
        Service.
      </Typography>
      {/* Add more sections as needed */}
    </Container>
  );
};

export default TermsAndConditions;
