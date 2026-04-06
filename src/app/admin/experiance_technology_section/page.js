"use client";

import { useState, useEffect } from "react";
import styles from "./experience_technology_section.module.css";

export default function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    experience: "",
    projects: "",
    technologies: [{ name: "", icon: "" }]
  });

  const [previewData, setPreviewData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false); // 🔹 form disable flag

  // 🔹 Fetch latest data on mount safely
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/get_who_i_am");
        if (!res.ok) throw new Error("Network response not ok");
        const data = await res.json();

        if (data?.success && data?.data) {
          setPreviewData([data.data]); // latest document
          setIsDisabled(true);          // disable form if data exists
        } else {
          setPreviewData([]);
          setIsDisabled(false);         // enable form if DB empty
        }
      } catch (err) {
        console.error("Error fetching preview data:", err);
        setPreviewData([]);
        setIsDisabled(false);           // API fail → enable form
      }
    }
    fetchData();
  }, []);

  // 🔹 input change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🔹 tech change
  function handleTechChange(index, field, value) {
    const updated = [...form.technologies];
    updated[index][field] = value;
    setForm({ ...form, technologies: updated });
  }

  // 🔹 icon file change → base64
  function handleIconChange(index, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => handleTechChange(index, "icon", reader.result);
    reader.readAsDataURL(file);
  }

  // ➕ add tech
  function addTech() {
    if (isDisabled) return;
    setForm({
      ...form,
      technologies: [...form.technologies, { name: "", icon: "" }]
    });
  }

  // ❌ remove tech
  function removeTech(index) {
    if (isDisabled) return;
    const updated = form.technologies.filter((_, i) => i !== index);
    setForm({ ...form, technologies: updated });
  }

  // 🚀 submit → API
  async function handleSubmit() {
    if (isDisabled) return;
    try {
      const res = await fetch("/api/upload_who_i_am", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data?.success) {
        alert("✅ Data Saved!");
        setPreviewData([form]);
        setIsDisabled(true);  // disable form after save
        setForm({
          title: "",
          subtitle: "",
          experience: "",
          projects: "",
          technologies: [{ name: "", icon: "" }],
        });
      } else {
        alert("❌ Error saving data");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Network error");
    }
  }

  return (
    <div className={styles.container}>
      <h2>Admin Panel</h2>
      <div className={styles.sectionsWrapper}>

        {/* Left Side - Form */}
        <div className={styles.formSection}>
          <h3>Add / Edit Data</h3>

          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className={styles.input} disabled={isDisabled} />
          <input name="subtitle" placeholder="Subtitle" value={form.subtitle} onChange={handleChange} className={styles.input} disabled={isDisabled} />
          <input name="experience" placeholder="Experience (1Y+)" value={form.experience} onChange={handleChange} className={styles.input} disabled={isDisabled} />
          <input name="projects" placeholder="Projects (10+)" value={form.projects} onChange={handleChange} className={styles.input} disabled={isDisabled} />

          <h4>Technologies</h4>
          {form.technologies.map((tech, i) => (
            <div key={i} className={styles.techRow}>
              <input placeholder="Name (React)" value={tech.name} onChange={(e) => handleTechChange(i, "name", e.target.value)} className={styles.input} disabled={isDisabled} />
              <input type="file" accept="image/*" onChange={(e) => handleIconChange(i, e.target.files?.[0])} className={styles.input} disabled={isDisabled} />
              <button onClick={() => removeTech(i)} className={styles.deleteButton} disabled={isDisabled}>❌</button>
            </div>
          ))}

          <button onClick={addTech} className={styles.button} disabled={isDisabled}>➕ Add Technology</button>
          <br /><br />
          <button onClick={handleSubmit} className={styles.button} disabled={isDisabled}>🚀 Save Data</button>
        </div>

        {/* Right Side - Preview */}
        <div className={styles.previewSection}>
          <h3>Preview / Uploaded Data</h3>
          {previewData.length === 0 ? <p>No data uploaded yet.</p> :
            previewData.map((item, idx) => (
              <div key={idx} className={styles.previewCard}>
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
                <p>{item.experience}</p>
                <p>{item.projects}</p>
                <h5>Technologies:</h5>
                <ul>
                  {item.technologies?.map((tech, tIdx) => (
                    <li key={tIdx}>
                      {tech.name} {tech.icon && <img src={tech.icon} width={24} height={24} alt={tech.name} />}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
}