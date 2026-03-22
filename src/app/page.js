"use client";

import { useState } from "react";
import Navbar from "../app/components/Navbar/Navbar";
import IntroSection from "./components/IntroSection/IntroSection"

export default function Home() {
  const [showSlider, setShowSlider] = useState(false);

  return (
    <>
     
        <>
          <IntroSection/>
         
        </>
      
    </>
  );
}