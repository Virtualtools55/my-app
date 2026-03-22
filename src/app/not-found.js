"use client";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      
      {/* 🔥 Glitch 404 */}
      <h1 className={styles.glitch} data-text="404">
        404
      </h1>

      {/* 🔹 Subtitle */}
      <h2 className={styles.subtitle}>
        ACCESS DENIED
      </h2>

      <p className={styles.desc}>
        The page you are trying to reach does not exist or has been removed.
      </p>

      {/* 🔥 Button */}
      <Link href="/" className={styles.btn}>
        ⬅ RETURN HOME
      </Link>

    </div>
  );
}