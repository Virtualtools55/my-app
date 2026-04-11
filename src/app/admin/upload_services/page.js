"use client";
import { useState, useEffect } from "react";
import styles from "./upload_services.module.css";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", p1: "", p2: "", p3: "", p4: "", bgImage: "" });

  const fetchServices = async () => {
    const res = await fetch("/api/get_services");
    const data = await res.json();
    if (data.success) setServices(data.data);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, bgImage: reader.result });
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/upload_services", {
      method: "POST",
      body: JSON.stringify({
        title: form.title,
        points: [form.p1, form.p2, form.p3, form.p4],
        bgImage: form.bgImage
      }),
    });
    if (res.ok) {
      setForm({ title: "", p1: "", p2: "", p3: "", p4: "", bgImage: "" });
      fetchServices();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Destroy service node?")) return;
    await fetch(`/api/delete_services?id=${id}`, { method: "DELETE" });
    fetchServices();
  };

  return (
    <div className={styles.adminContainer}>
      <h2 className={styles.head}>&gt; SERVICE_MANAGER</h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <input placeholder="Service Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <div className={styles.pointsInput}>
          <input placeholder="Point 1" value={form.p1} onChange={e => setForm({...form, p1: e.target.value})} required />
          <input placeholder="Point 2" value={form.p2} onChange={e => setForm({...form, p2: e.target.value})} required />
          <input placeholder="Point 3" value={form.p3} onChange={e => setForm({...form, p3: e.target.value})} required />
          <input placeholder="Point 4" value={form.p4} onChange={e => setForm({...form, p4: e.target.value})} required />
        </div>
        <input type="file" onChange={handleImage} accept="image/*" />
        <button type="submit">UPLOAD_TO_SYSTEM</button>
      </form>

      <hr className={styles.divider} />

      {/* 1 Row 2 Boxes Preview */}
      <div className={styles.previewGrid}>
        {services.map((s) => (
          <div key={s._id} className={styles.serviceBox} style={{ backgroundImage: `url(${s.bgImage})` }}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
              <button onClick={() => handleDelete(s._id)} className={styles.delBtn}>DELETE</button>
              <h3 className={styles.title}>{s.title}</h3>
              <div className={styles.points}>
                {s.points.map((p, i) => <span key={i}>• {p}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}