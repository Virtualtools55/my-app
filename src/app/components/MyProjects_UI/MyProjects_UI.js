"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./MyProjects_UI.module.css";

export default function ProjectGallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/get_projects", {
          cache: "no-store", // 🔥 always fresh data
        });

        const result = await res.json();

        if (result.success) {
          setProjects(result.data);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

// ... existing imports

  if (loading) {
    return (
      <div className={styles.loading}>
        {`> INITIALIZING_SYSTEM_FETCH...`}
      </div>
    );
  }

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.Technology}>
        <h2>My Projects</h2>
      </div>

      <div className={styles.projectGrid}>
        {projects.length > 0 ? (
          projects.map((p) => (
            <a
              key={p._id}
              href={p.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <Image
                src={p.imageUrl}
                alt={p.title}
                fill
                className={styles.bgImage}
              />

              <div className={styles.overlay}>
                <h3 className={styles.projectTitle}>{p.title}</h3>
              </div>
            </a>
          ))
        ) : (
          <p className={styles.noData}>ERROR: NO_PROJECTS_FOUND</p>
        )}
      </div>
    </div>
  );
}