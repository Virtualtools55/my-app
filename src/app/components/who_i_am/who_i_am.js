"use client";

import { useEffect, useState } from "react";
import styles from "@/app/components/who_i_am/who_i_am.module.css";

export default function WhoIAm() {
  const [profileData, setProfileData] = useState(null); 
  const [techList, setTechList] = useState([]);        
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [profileRes, techRes] = await Promise.all([
          fetch("/api/get_who_i_am"),
          fetch("/api/get_technology")
        ]);

        const profileJson = await profileRes.json();
        const techJson = await techRes.json();

        if (profileJson.success) setProfileData(profileJson.data);
        if (techJson.success) setTechList(techJson.data);

      } catch (error) {
        console.error("Data fetch karne mein error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  // ✅ 1. Pehle wala "if (!profileData) return null" hata diya hai.
  // Ab component render hona band nahi hoga.

  // ... existing imports

return (
  <section className={styles.container}>
    <div className={styles.Technology}>
      <h2>Technology</h2>
    </div>

    {profileData && (
      <div className={styles.topCard}>
        <div>
          <h2>{profileData.title}</h2>
          <p>{profileData.subtitle || profileData.subtitle}</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.state1}>
            <h3>{profileData.experience}</h3>
            <span>Experience</span>
          </div>
          <div className={styles.state2}>
            <h3>{profileData.projects}</h3>
            <span>Projects</span>
          </div>
        </div>
      </div>
    )}

    <div className={styles.skills}>
      {techList && techList.length > 0 ? (
        techList.map((tech) => (
          <div key={tech._id} className={styles.card}>
            <img 
              src={tech.icon} 
              alt={tech.name} 
              style={{ 
                width: '40px', 
                height: '40px', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 5px rgba(0, 255, 65, 0.3))' 
              }}
            />
            <span>{tech.name}</span>
          </div>
        ))
      ) : (
        <p className={styles.loading}>Searching databases...</p>
      )}
    </div>
  </section>
);
}