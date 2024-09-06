import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import AppointmentDeal from "./Secation/AppointmentDeal";
import ChooseUsSection from "./Secation/ChooseUsSection";
import FooterSection from "./Secation/FooterSection";
import GallerySection from "./Secation/GallerySection";
import LandingSection from "./Secation/LandingSection";
import TrustedSection from "./Secation/TrustedSection";
import WorkSection from "./Secation/WorkSection";
import CustomerHeader from "../../shared/header/CustomerHeader";
import { getCustomerLocation } from "../../helpers/getCustomerLocation";
import { getOpenSalonsListService } from "../../services/salons";
import { SalonInformationType } from "../../types/salon";

function LandingPage() {
  const landingSectionRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);
  const appointmentDealRef = useRef<HTMLDivElement>(null);
  const chooseUsSectionRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const trustedSectionRef = useRef<HTMLDivElement>(null);
  const footerSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const sections = [
    { id: 1, title: "Home", ref: landingSectionRef },
    { id: 2, title: "How it Works", ref: workSectionRef },
    { id: 3, title: "Appointment & Deals", ref: appointmentDealRef },
    { id: 4, title: "Why Choose Us", ref: chooseUsSectionRef },
    { id: 5, title: "Gallery", ref: gallerySectionRef },
    { id: 6, title: "Top Reviews", ref: trustedSectionRef },
  ];
  function renderCommonHeader() {
    return sections.map((section) => (
      <Button
        key={section.title}
        onClick={() => scrollToSection(section.ref)}
        sx={{ color: "#FFF" }}
      >
        {section.title}
      </Button>
    ));
  }
  const [salonList, setSalonList] = useState([]);
  async function getSalonList() {
    try {
      const userPosition = await getCustomerLocation();
      const { longitude, latitude } = userPosition.coords;
      const customerPosition: {
        longitude: number;
        latitude: number;
      } = {
        longitude,
        latitude,
      };

      const list = await getOpenSalonsListService(customerPosition);

      setSalonList(list);
    } catch (error: any) {
      console.error("error getSalonList", error);
    }
  }
  useEffect(() => {
    getSalonList();
  }, []);
  const categories = [
    ...new Set(
      salonList.flatMap((salon: SalonInformationType) =>
        salon.services.map((service) => service.category)
      )
    ),
  ];
  const [category, setCategory] = useState("Massage Therapy");

  const applyFiltersAndSorting = () => {
    let filteredSalons = salonList;

    if (category) {
      filteredSalons = filteredSalons.filter((salon: SalonInformationType) =>
        salon.services.some((service) =>
          service.category.toLowerCase().includes(category.toLowerCase())
        )
      );
    }

    return filteredSalons;
  };

  return (
    <Box sx={{ width: "100%", margin: "0 auto", backgroundColor: "#f4f4f7" }}>
      <CustomerHeader
        isLandingPage={true}
        renderCommonHeader={renderCommonHeader}
      />

      <Box component="main">
        {" "}
        <div ref={landingSectionRef}>
          <LandingSection />
        </div>
        <div ref={workSectionRef}>
          <WorkSection />
        </div>
        <div ref={appointmentDealRef}>
          <AppointmentDeal
            categories={categories}
            setCategory={setCategory}
            applyFiltersAndSorting={applyFiltersAndSorting}
          />
        </div>
        <div ref={chooseUsSectionRef}>
          <ChooseUsSection />
        </div>
        <div ref={gallerySectionRef}>
          <GallerySection />
        </div>
        <div ref={trustedSectionRef}>
          <TrustedSection />
        </div>
        <div ref={footerSectionRef}>
          <FooterSection />
        </div>
      </Box>
    </Box>
  );
}

export default LandingPage;
