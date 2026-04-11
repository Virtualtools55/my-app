import styles from "./services.module.css";

// 🔹 Data Fetching Function
async function getServices() {
  // Yahan apni domain ka full URL dein (Production ke liye)
  // Localhost par: http://localhost:3000

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/get_services`, {
    cache: "no-store", // Taaki har baar fresh data mile (Dynamic)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
}

export default async function ServicesPage() {
  const response = await getServices();
  const services = response.data || [];

  return (
    <section className={styles.servicesSection}>
      <div className={styles.header}>
        <h2 className={styles.glitch}>&gt; EXECUTING_SERVICES_LIST</h2>
      </div>

      <div className={styles.servicesGrid}>
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className={styles.serviceBox}>
              {/* Background Image with Blur */}
              <div 
                className={styles.bgImage} 
                style={{ backgroundImage: `url(${service.bgImage})` }}
              ></div>
              
              <div className={styles.overlay}></div>

              <div className={styles.content}>
                <h3 className={styles.serviceTitle}>
                  <span className={styles.neonText}>#</span> {service.title}
                </h3>
                
                <ul className={styles.pointsList}>
                  {service.points.map((point, index) => (
                    <li key={index} className={styles.pointItem}>
                      <span className={styles.bullet}>[dir]</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noData}>&gt; NO_SERVICES_FOUND_IN_DATABASE</p>
        )}
      </div>
    </section>
  );
}