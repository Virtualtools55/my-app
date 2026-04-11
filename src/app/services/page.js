import dbConnect from "@/lib/db";
import Service from "@/model/Services_schema";
import styles from "./services.module.css";

export default async function ServicesPage() {
  await dbConnect();
  const services = await Service.find({}).sort({ createdAt: -1 });

  return (
    <div className={styles.container}>
      <h2 className={styles.glitchTitle}>
        <span className={styles.prefix}>root@portfolio:~#</span> fetch services --list
      </h2>

      <div className={styles.grid}>
        {services.map((service) => (
          <div key={service._id} className={styles.serviceBox}>
            <div className={styles.cardHeader}>
              <div className={styles.dot}></div>
              <span className={styles.serviceTitle}>{service.title}</span>
            </div>
            
            <ul className={styles.pointsGrid}>
              {service.points.map((point, index) => (
                <li key={index} className={styles.pointItem}>
                  <span className={styles.terminalIcon}>$</span> {point}
                </li>
              ))}
            </ul>
            <div className={styles.boxGlow}></div>
          </div>
        ))}
      </div>
    </div>
  );
}