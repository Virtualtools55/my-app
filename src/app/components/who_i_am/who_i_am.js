"use client";

import styles from "@/app/components/who_i_am/who_i_am.module.css";

export default function whoiam() {
  return (
    <section className={styles.container}>
      
      {/* TOP CARD */}
      <div className={styles.topCard}>
        <div>
          <h2>I build fast, modern web experiences</h2>
          <p>Clean code • High performance • Scalable apps</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.state1}>
            <h3>1Y+</h3>
            <span>Experience</span>
          </div>
          <div className={styles.state2}>
            <h3>10+</h3>
            <span>Projects</span>
          </div>
        </div>
      </div>

      {/* BOTTOM SKILLS */}
      <div className={styles.skills}>
        <div className={styles.card}>⚛️ React</div>
        <div className={styles.card}>▲ Next.js</div>
        <div className={styles.card}>🍃 MongoDB</div>
      </div>

    </section>
  );
}