"use client";

import { useEffect, useState } from "react";
import styles from "./IntroUpload.module.css";
import Image from "next/image";

export default function IntroUpload() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const [message, setMessage] = useState("");
  
  // 🔹 लोडिंग स्टेट (Loading State)
  const [isUploading, setIsUploading] = useState(false);

  // 🔹 डेटा फेच करने का फंक्शन
  const fetchData = async () => {
    try {
      const res1 = await fetch("/api/get_intro_headings");
      const data1 = await res1.json();
      
      const res2 = await fetch("/api/get_intro_images");
      const data2 = await res2.json();

      // डेटा को स्टेट में सेट करना (Check if data exists)
      setHeadings(data1.headings || []);
      setImagesList(data2.data || []);
      
      console.log("Headings Loaded:", data1.headings);
      console.log("Images Loaded:", data2.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setMessage("डेटा लोड करने में समस्या आई ❌");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 1. Heading Submit
  const handleHeadingSubmit = async (e) => {
    e.preventDefault();
    if (!text) return setMessage("Text लिखें ❌");

    setIsUploading(true);
    try {
      const res = await fetch("/api/add-heading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Heading added successfully ✅");
        setText("");
        fetchData(); // लिस्ट रिफ्रेश करें
      }
    } catch (err) {
      setMessage("Error adding heading ❌");
    } finally {
      setIsUploading(false);
    }
  };

  // 🔹 2. Image Submit
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setMessage("इमेज चुनें ❌");

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("/api/upload-intro-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Image uploaded successfully ✅");
        setImage(null);
        fetchData(); // लिस्ट रिफ्रेश करें
      }
    } catch (err) {
      setMessage("Error uploading image ❌");
    } finally {
      setIsUploading(false);
    }
  };

  // 🔹 3. Delete Heading
  const deleteHeading = async (id) => {
    if (!confirm("क्या आप इसे डिलीट करना चाहते हैं?")) return;
    try {
      const res = await fetch(`/api/delete-heading?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessage("Deleted! 🗑️");
        fetchData();
      }
    } catch (err) {
      setMessage("Delete failed ❌");
    }
  };

  // 🔹 4. Delete Image
  const deleteImage = async (id) => {
    if (!confirm("क्या आप इस इमेज को डिलीट करना चाहते हैं?")) return;
    try {
      const res = await fetch(`/api/delete-intro-image?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessage("Image deleted! 🗑️");
        fetchData();
      }
    } catch (err) {
      setMessage("Delete failed ❌");
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      
      {/* 🔹 LEFT SIDE: FORMS */}
      <div className={styles.formSection}>
        <h2 className={styles.title}>Admin Panel</h2>
        
        <div className={styles.card}>
          <h3>Add New Heading</h3>
          <form onSubmit={handleHeadingSubmit} className={styles.formGroup}>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              className={styles.inputField} 
              placeholder="Ex: Web Developer"
              disabled={isUploading}
            />
            <button type="submit" className={styles.primaryBtn} disabled={isUploading}>
              {isUploading ? <span className={styles.spinner}></span> : "Add"}
            </button>
          </form>
        </div>

        <div className={styles.card}>
          <h3>Upload Image</h3>
          <form onSubmit={handleImageSubmit} className={styles.formGroup}>
            <input 
              type="file" 
              onChange={(e) => setImage(e.target.files[0])} 
              className={styles.fileInput} 
              disabled={isUploading}
            />
            <button type="submit" className={styles.secondaryBtn} disabled={isUploading}>
              {isUploading ? <span className={styles.spinner}></span> : "Upload"}
            </button>
          </form>
        </div>
        
        {message && <p className={styles.statusMsg}>{message}</p>}
      </div>

      {/* 🔹 RIGHT SIDE: LIVE CONTENT PREVIEW */}
      <div className={styles.previewSection}>
        <h2 className={styles.title}>Live Content</h2>

        {/* Headings List */}
        <div className={styles.previewCard}>
          <h3>Headings ({headings.length})</h3>
          <div className={styles.tagContainer}>
            {headings.map((h, index) => (
              <div key={h.id || index} className={styles.tag}>
                <span>{h.text}</span>
                <button onClick={() => deleteHeading(h.id)} className={styles.delBtn}>×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        <div className={styles.previewCard}>
          <h3>Gallery ({imagesList.length})</h3>
          <div className={styles.imageGrid}>
            {imagesList.map((img, index) => (
              <div key={img.id || index} className={styles.imgWrapper}>
                <Image 
                  src={img.image_url} 
                  alt="portfolio" 
                  fill 
                  className={styles.thumb} 
                />
                <button onClick={() => deleteImage(img.id)} className={styles.delImgBtn}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}