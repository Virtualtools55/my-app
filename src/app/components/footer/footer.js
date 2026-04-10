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
            <a href="https://github.com" target="_blank" className={styles.link}>GITHUB</a>
            <a href="https://linkedin.com" target="_blank" className={styles.link}>LINKEDIN</a>
            <a href="/resume" className={styles.link}>RESUME</a>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} | Executed by <span className={styles.highlight}>YourName</span>
          </p>
          <p className={styles.loc}>LOC: INDORE // INDIA</p>
        </div>
      </div>
    </footer>
  );
}