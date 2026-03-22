"use client";
import styles from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/services">Services</Link>
      <Link href="/about">About</Link>
      <Link href="/connect">Connect</Link>
    </nav>
  );
}