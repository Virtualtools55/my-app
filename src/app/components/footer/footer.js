import React from 'react';
import styles from './footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.statusSection}>
          <span className={styles.pulse}></span>
          <p className={styles.statusText}>SYSTEM STATUS: POSITIVE & EVOLVING</p>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>DEV<span>_</span>TERMINAL</h3>
            <p className={styles.tagline}>Building the future, one commit at a time.</p>
          </div>

          <div className={styles.links}>
            <a href="https://github.com/Virtualtools55" target="_blank" className={styles.link}>GITHUB</a>
            <a href="https://www.linkedin.com/in/ankit-kumar-a4b8a8402/" target="_blank" className={styles.link}>LINKEDIN</a>
            
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} | Executed by <span className={styles.highlight}>Ankit Kumar</span>
          </p>
          <p className={styles.loc}>LOC: JABALPUR // INDIA</p>
        </div>
      </div>
    </footer>
  );
}