import styles from "./about.module.css";

export default function AboutSection() {
  return (
    <section className={styles.aboutContainer}>
      <div className={styles.terminalWindow}>
        <div className={styles.terminalHeader}>
          <div className={styles.buttons}>
            <span className={styles.close}></span>
            <span className={styles.minimize}></span>
            <span className={styles.maximize}></span>
          </div>
          <div className={styles.title}>whoami.exe</div>
        </div>

        <div className={styles.terminalBody}>
          <p className={styles.command}>&gt; cat profile.txt</p>
          
          <div className={styles.content}>
            <p>
              I build web experiences with a simple philosophy: 
              <span className={styles.highlight}> DO WHAT MATTERS.</span>
            </p>
            
            <p>
              My thought process is straightforward—I don't just write code; 
              I bring ideas to life exactly how I envision them. I have a deep 
              urge to create things that align with my creative standards, 
              constantly pushing to make every pixel and function better than the last.
            </p>

            <p className={styles.commitment}>
              <span className={styles.prefix}>[COMMITMENT]:</span> When a client 
              shares their requirements, I don't just deliver a service. 
              I give <span className={styles.neon}>100% of my focus</span> to 
              ensure the project isn't just completed, but perfected.
            </p>

            <p className={styles.status}>
              Status: <span className={styles.blink}>Ready_to_Build_Something_Epic</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}