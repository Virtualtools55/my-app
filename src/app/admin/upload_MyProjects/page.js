"use client"
import { useState, useEffect } from 'react';
import styles from './upload_MyProjects.module.css';

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', imageUrl: '', projectLink: '' });
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const res = await fetch('/api/get_projects');
    const result = await res.json();
    setProjects(result.data || []);
  };

  useEffect(() => { loadData(); }, []);

  // Image file ko Base64 mein convert karne ka function
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, imageUrl: reader.result }); // Base64 string set ho jayegi
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/upload_projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (result.success) {
        alert("Project uploaded and image saved to ImageKit!");
        setForm({ title: '', imageUrl: '', projectLink: '' });
        loadData();
      }
    } catch (error) {
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adminWrapper}>
      <h1 style={{ marginBottom: '20px' ,color:'#000000'}}>My Projects</h1>
      
      <form onSubmit={handleUpload} className={styles.uploadCard}>
        <div className={styles.formGrid}>
          <input 
            className={styles.inputField} 
            placeholder="Project Name" 
            value={form.title} 
            onChange={e => setForm({...form, title: e.target.value})} 
            required 
          />
          
          {/* File input image upload ke liye */}
          <div className={styles.fileInputGroup}>
            <label>Select Project Image:</label>
            <input 
              type="file" 
              className={styles.inputField} 
              accept="image/*" 
              onChange={handleFileChange} 
              required 
            />
          </div>

          <input 
            className={styles.inputField} 
            placeholder="Live Project Link" 
            value={form.projectLink} 
            onChange={e => setForm({...form, projectLink: e.target.value})} 
            required 
          />
          
          <button className={styles.uploadBtn} disabled={loading}>
            {loading ? "Uploading..." : "Upload Project"}
          </button>
        </div>
      </form>

      <div className={styles.listContainer}>
        {projects.map(p => (
          <div key={p._id} className={styles.adminItem}>
            <div className={styles.itemInfo}>
              <img src={p.imageUrl} alt="" className={styles.miniThumb} />
              <span>{p.title}</span>
            </div>
            <button className={styles.deleteBtn}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}