"use client";

import { useEffect, useState } from "react";
import styles from "./IntroSection.module.css";
import Image from "next/image";

export default function IntroSection() {
  const [headings, setHeadings] = useState([]);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 डेटा प्राप्त करें (Fetch API Data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch("/api/get_intro_headings");
        const data1 = await res1.json();

        const res2 = await fetch("/api/get_intro_images");
        const data2 = await res2.json();

        setHeadings(data1.headings || []);
        setImages(data2.data || []);
      } catch (error) {
        console.error("Data fetch karne mein galti:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 ऑटो इमेज स्लाइडर (Auto Image Slider)
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className={styles.container}>
      {/* 🔹 इमेज पिलर (Rectangle Pillar) */}
      <div className={styles.imageDiv}>
        {images.length > 0 && (
          <Image
            src={images[currentIndex].image_url}
            alt="profile"
            fill
            className={styles.circleImage}
          />
        )}
      </div>

      {/* 🔹 टेक्स्ट कार्ड (Text Card) */}
      <div className={styles.textDiv}>
        <div className={styles.scrollWrapper}>
          <div className={styles.scrollContent}>
            {Array.isArray(headings) &&
              [...headings, ...headings].map((item, index) => (
                /* index का उपयोग करें ताकि हर आइटम की की (key) अलग हो */
                <h1 key={index} className={styles.scrollItem}>
                  {item?.text}
                </h1>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
