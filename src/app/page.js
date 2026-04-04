"use client";

import { useState } from "react";
import Navbar from "../app/components/Navbar/Navbar";
import IntroSection from "./components/IntroSection/IntroSection";
import WhoIAm from "./components/who_i_am/who_i_am";

export default function Home() {
  const [showSlider, setShowSlider] = useState(false);

  return (
    <>
      <IntroSection />
      <WhoIAm />
    </>
  );
}