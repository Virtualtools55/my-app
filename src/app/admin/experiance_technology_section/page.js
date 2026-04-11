"use client";

import { useState, useEffect } from "react";
import styles from "./experience_technology_section.module.css";

export default function AdminPage() {
  const [mainForm, setMainForm] = useState({ title: "", subtitle: "", experience: "", projects: "" });
  const [techForm, setTechForm] = useState({ name: "", icon: "" });
  const [previewData, setPreviewData] = useState(null);
  const [allTechs, setAllTechs] = useState([]);
  const [isMainDisabled, setIsMainDisabled] = useState(false);

  // 🔹 Fetch Data independently
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/get_who_i_am");
      const data = await res.json();
      if (data?.success && data?.data) {
        setPreviewData(data.data);
        setIsMainDisabled(true);
      }
    } catch (err) { console.error("Profile fetch error"); }
  };

  const fetchTechs = async () => {
    try {
      const res = await fetch("/api/get_technology");
      const data = await res.json();
      if (data?.success) setAllTechs(data.data);
    } catch (err) { console.error("Tech fetch error"); }
  };

  useEffect(() => {
    fetchProfile();
    fetchTechs();
  }, []);

  // 🚀 Save Main Profile
  async function handleMainSubmit(e) {
    e.preventDefault();
    if (!mainForm.title) return alert("Title is required");
    const res = await fetch("/api/upload_who_i_am", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mainForm),
    });
    const data = await res.json();
    if (data.success) {
      setPreviewData(data.data);
      setIsMainDisabled(true);
    }
  }

  // 🗑️ DELETE Profile (Fixed Logic)
  async function handleDeleteMainProfile(e) {
    e.stopPropagation(); // Click event ko bahar jane se roko
    if (!confirm("Are you sure you want to delete profile info?")) return;
    
    try {
      const res = await fetch("/api/delete_who_i_am", { method: "DELETE" });
      const data = await res.json();
      
      if (data.success) {
        // Sirf profile state ko reset karo, allTechs ko nahi
        setPreviewData(null);
        setIsMainDisabled(false);
        setMainForm({ title: "", subtitle: "", experience: "", projects: "" });
        alert("Profile info deleted successfully!");
      }
    } catch (err) {
      alert("Error deleting profile");
    }
  }

  // 🚀 Upload Tech
  async function handleTechSubmit(e) {
    e.preventDefault();
    if (!techForm.name || !techForm.icon) return alert("Fill tech details");
    const res = await fetch("/api/upload_technology", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(techForm),
    });
    const data = await res.json();
    if (data.success) {
      setAllTechs((prev) => [data.data, ...prev]);
      setTechForm({ name: "", icon: "" });
    }
  }

  // 🗑️ DELETE Tech Icon
  async function handleDeleteTech(e, id) {
    e.stopPropagation();
    if (!confirm("Delete icon?")) return;
    
    try {
      const res = await fetch(`/api/delete_technology?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAllTechs((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      alert("Error deleting tech");
    }
  }

  function handleIconChange(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setTechForm({ ...techForm, icon: reader.result });
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Experience & Technology Section</h2>
      
      <div className={styles.sectionsWrapper}>
        
        {/* LEFT: FORMS */}
        <div className={styles.formSection}>
          <div className={`${styles.formCard} ${isMainDisabled ? styles.locked : ""}`}>
            <h3>{isMainDisabled ? "✅ Profile Locked" : "📝 Edit Profile Info"}</h3>
            <input className={styles.input} placeholder="Title" value={mainForm.title} onChange={(e) => setMainForm({...mainForm, title: e.target.value})} disabled={isMainDisabled} />
            <input className={styles.input} placeholder="Subtitle" value={mainForm.subtitle} onChange={(e) => setMainForm({...mainForm, subtitle: e.target.value})} disabled={isMainDisabled} />
            <div className={styles.row}>
              <input className={styles.input} placeholder="Exp" value={mainForm.experience} onChange={(e) => setMainForm({...mainForm, experience: e.target.value})} disabled={isMainDisabled} />
              <input className={styles.input} placeholder="Proj" value={mainForm.projects} onChange={(e) => setMainForm({...mainForm, projects: e.target.value})} disabled={isMainDisabled} />
            </div>
            {!isMainDisabled && <button onClick={handleMainSubmit} className={styles.saveBtn}>Save Details</button>}
          </div>

          <div className={styles.formCard} style={{ marginTop: '20px' }}>
            <h3>🚀 Add Technology</h3>
            <input className={styles.input} placeholder="Name" value={techForm.name} onChange={(e) => setTechForm({...techForm, name: e.target.value})} />
            <input className={styles.input} type="file" onChange={(e) => handleIconChange(e.target.files?.[0])} />
            <button onClick={handleTechSubmit} className={styles.techBtn}>Upload Icon</button>
          </div>
        </div>

        {/* RIGHT: PREVIEW (Yahan alag alag sections hain) */}
        <div className={styles.previewSection}>
          <h3 className={styles.previewHeading}>Live Preview</h3>
          
          {/* Section 1: Profile (Independent) */}
          <div style={{minHeight: '150px', marginBottom: '30px'}}>
            {previewData ? (
              <div className={styles.modernPreviewCard}>
                <button onClick={(e) => handleDeleteMainProfile(e)} className={styles.floatingDeleteMain}>🗑️</button>
                <div className={styles.cardGlow}></div>
                <h2>{previewData.title}</h2>
                <p>{previewData.subtitle}</p>
                <div className={styles.statsContainer}>
                  <div className={styles.statBox}><span>{previewData.experience}</span><label>Exp</label></div>
                  <div className={styles.statBox}><span>{previewData.projects}</span><label>Projects</label></div>
                </div>
              </div>
            ) : (
              <div className={styles.emptyPreview}>Profile deleted. Forms are now editable.</div>
            )}
          </div>

          {/* Section 2: Technology (Independent) */}
          <div className={styles.techPreviewArea}>
            <h4 style={{ color: '#fff', marginBottom: '15px' }}>Technologies Bank ({allTechs.length})</h4>
            <div className={styles.modernTechGrid}>
              {allTechs.length > 0 ? (
                allTechs.map((tech) => (
                  <div key={tech._id} className={styles.modernTechItem}>
                    <button onClick={(e) => handleDeleteTech(e, tech._id)} className={styles.techDeleteBadge}>×</button>
                    <img src={tech.icon} alt={tech.name} />
                    <span>{tech.name}</span>
                  </div>
                ))
              ) : (
                <p style={{ color: '#666' }}>No icons uploaded yet.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}