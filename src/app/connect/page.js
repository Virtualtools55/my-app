import styles from "./connect.module.css";

export default function Connect() {
  return (
    <section className={styles.container}>
      <div className={styles.terminalBox}>
        <div className={styles.scanline}></div>
        
        <div className={styles.header}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
          <span className={styles.status}>STATUS: ONLINE</span>
        </div>

        <div className={styles.content}>
          <p className={styles.command}>&gt; locate --contact-info</p>
          <h2 className={styles.title}>ESTABLISH_CONNECTION</h2>
          
          <p className={styles.text}>
            I am currently open for new projects and collaborations. 
            If you have a requirement, I am ready to give my <span className={styles.highlight}>100% best</span> to bring it to life.
          </p>

          <div className={styles.emailSection}>
            <span className={styles.label}>DIRECT_EMAIL:</span>
            <a href="mailto:tools.designwebdev@gmail.com" className={styles.emailLink}>
              tools.designwebdev@gmail.com
            </a>
          </div>

          <p className={styles.footer}>&gt; _awaiting_transmission</p>
        </div>
      </div>
    </section>
  );
}