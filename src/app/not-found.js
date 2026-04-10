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

      {/* 🔹 Subtitle with Hacker vibe */}
      <h2 className={styles.subtitle}>
        SYSTEM_FAILURE: PAGE_NOT_FOUND
      </h2>

      <p className={styles.desc}>
        {`> The requested URL was not found on this server.`} <br />
        {`> Traceback (most recent call last): 404_ERROR`}
      </p>

      {/* 🔥 Button */}
      <Link href="/" className={styles.btn}>
        {`[ RETURN_TO_DASHBOARD ]`}
      </Link>

    </div>
  );
}