"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./IntroUpload.module.css";
import Image from "next/image";

export default function IntroUpload() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const [message, setMessage] = useState("");

  const timerRef = useRef(null);

  const showMessage = (msg) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessage(msg);
    timerRef.current = setTimeout(() => setMessage(""), 5000);
  };

  const [isHeadingUploading, setIsHeadingUploading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  // Check if image exists in list (as per your logic)
  const isImageExist = imagesList.length > 0;

  const fetchData = async () => {
    try {
      const res1 = await fetch("/api/get_intro_headings");
      const data1 = await res1.json();

      const res2 = await fetch("/api/get_intro_images");
      const data2 = await res2.json();

      if (data1.success) setHeadings(data1.headings || []);
      if (data2.success) setImagesList(data2.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      showMessage("डेटा लोड करने में समस्या आई ❌");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHeadingSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return showMessage("Text लिखें ❌");
    setIsHeadingUploading(true);

    try {
      const res = await fetch("/api/add-heading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.success) {
        showMessage("Heading added successfully ✅");
        setText("");
        fetchData();
      }
    } catch (err) {
      showMessage("Error adding heading ❌");
    } finally {
      setIsHeadingUploading(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (isImageExist) return showMessage("केवल 1 इमेज ही अपलोड कर सकते हैं ❌");
    if (!image) return showMessage("इमेज चुनें ❌");

    setIsImageUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", "Intro Image"); // Sending default title

    try {
      const res = await fetch("/api/upload-intro-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        showMessage("Image uploaded successfully ✅");
        setImage(null);
        fetchData();
      } else {
        showMessage(data.error || "Upload failed ❌");
      }
    } catch (err) {
      showMessage("Error uploading image ❌");
    } finally {
      setIsImageUploading(false);
    }
  };

  const deleteHeading = async (_id) => {
    if (!confirm("क्या आप इसे डिलीट करना चाहते हैं?")) return;
    try {
      const res = await fetch(`/api/delete-intro-heading?id=${_id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { showMessage("Heading deleted 🗑️"); fetchData(); }
    } catch (err) { showMessage("Delete failed ❌"); }
  };

  const deleteImage = async (_id) => {
    if (!confirm("क्या आप इस इमेज को डिलीट करना चाहते हैं?")) return;
    try {
      const res = await fetch(`/api/delete-intro-image?id=${_id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { showMessage("Image deleted! 🗑️"); fetchData(); }
    } catch (err) { showMessage("Delete failed ❌"); }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.formSection}>
        <h2 className={styles.title}>Intro Upload</h2>
        <div className={styles.card}>
          <h3>Add New Heading</h3>
          <form onSubmit={handleHeadingSubmit} className={styles.formGroup}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className={styles.inputField} disabled={isHeadingUploading} />
            <button type="submit" className={styles.primaryBtn} disabled={isHeadingUploading}>
              {isHeadingUploading ? <span className={styles.spinner}></span> : "Add"}
            </button>
          </form>
        </div>

        <div className={styles.card}>
          <h3>Upload Image</h3>
          <form onSubmit={handleImageSubmit} className={styles.formGroup}>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} className={styles.fileInput} disabled={isImageUploading || isImageExist} />
            <button type="submit" className={styles.secondaryBtn} disabled={isImageUploading || isImageExist}>
              {isImageUploading ? <span className={styles.spinner}></span> : isImageExist ? "Only 1 Image Allowed" : "Upload"}
            </button>
          </form>
        </div>
        {message && <p className={styles.statusMsg}>{message}</p>}
      </div>

      <div className={styles.previewSection}>
        <h2 className={styles.title}>Live Content</h2>
        <div className={styles.previewCard}>
          <h3>Headings ({headings.length})</h3>
          <div className={styles.tagContainer}>
            {headings.map((h) => (
              <div key={h._id} className={styles.tag}>
                <span>{h.text}</span>
                <button onClick={() => deleteHeading(h._id)} className={styles.delBtn}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.previewCard}>
          <h3>Gallery ({imagesList.length})</h3>
          <div className={styles.imageGrid}>
            {imagesList.map((img) => (
              <div key={img._id} className={styles.imgWrapper}>
                <Image 
                  src={img.imageUrl} // 👈 Fixed: Use imageUrl instead of image_url
                  alt="portfolio" 
                  fill 
                  className={styles.thumb} 
                />
                <button onClick={() => deleteImage(img._id)} className={styles.delImgBtn}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}