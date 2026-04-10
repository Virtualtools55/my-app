"use client";

import { useState } from "react";
import Navbar from "../app/components/Navbar/Navbar";
import IntroSection from "./components/IntroSection/IntroSection";
import WhoIAm from "./components/who_i_am/who_i_am";
import MyProjects_UI from "./components/MyProjects_UI/MyProjects_UI";
import Footer from "./components/footer/footer";

export default function Home() {
  const [showSlider, setShowSlider] = useState(false);

  return (
    <>
      <IntroSection />
      <WhoIAm />
      <MyProjects_UI/>
      <Footer/>
      
    </>
  );
}