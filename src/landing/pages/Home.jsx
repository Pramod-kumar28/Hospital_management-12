import React, { useEffect, useState } from "react";
import HeroSection from "../home-Sections/HeroSection/";
import MobileAppSection from "../home-Sections/MobileAppSection";
import FeaturesModulesSection from "../home-Sections/FeaturesModulesSection";
import TelemedicineSection from "../home-Sections/TelemedicineSection";
import WhyWeStandOutSection from "../home-Sections/WhyWeStandOutSection";
import WhyChooseSection from "../home-Sections/WhyChooseSection";
import BenefitsSection from "../home-Sections/BenefitsSection";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <HeroSection isVisible={isVisible} />
      <FeaturesModulesSection />
      <WhyWeStandOutSection />
      <TelemedicineSection />
      <BenefitsSection />
      <WhyChooseSection />
      <MobileAppSection />
    </>
  );
}
