"use client";

import { useEffect, useState } from "react";
import styles from "./IntroSection.module.css";
import Image from "next/image";

export default function IntroSection() {
  const [headings, setHeadings] = useState([]);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 API से डेटा फेच करें
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resHeadings, resImages] = await Promise.all([
          fetch("/api/get_intro_headings"),
          fetch("/api/get_intro_images")
        ]);

        const data1 = await resHeadings.json();
        const data2 = await resImages.json();

        setHeadings(data1.headings || []);
        setImages(data2.data || []);
      } catch (error) {
        console.error("डेटा फेच करने में एरर:", error);
      }
    };
    fetchData();
  }, []);

  // 🔹 ऑटो इमेज स्लाइडर (हर 2.5 सेकंड में बदलेगा)
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className={styles.container}>
      <div className={styles.sub_container}>
        
        {/* 🔹 इमेज पिलर सेक्शन */}
        <div className={styles.imageDiv}>
          {images.length > 0 && (
            <Image
              src={images[currentIndex].image_url}
              alt="Profile Slider"
              fill
              priority
              className={styles.circleImage}
            />
          )}
        </div>

        {/* 🔹 रोलर टेक्स्ट सेक्शन */}
        <div className={styles.textDiv}>
          <div className={styles.scrollWrapper}>
            <div className={styles.scrollContent}>
              {/* इन्फिनिट लूप के लिए डेटा को दो बार रेंडर करना */}
              {headings.length > 0 && 
                [...headings, ...headings].map((item, index) => (
                  <h1 key={index} className={styles.scrollItem}>
                    {item?.text}
                  </h1>
                ))
              }
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}