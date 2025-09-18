import Script from "next/script";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <canvas
        id="gradient-canvas"
        className={styles.canvas}
        aria-hidden="true"
      />
      <div className={styles.title}>
        <h1>SwissSkills 2025 Demo</h1>
        <p>
          Demo für den Cloud Computing Skill an den SwissSkills 2025 in Bern!
        </p>
      </div>
      <Script src="/gradient.js" strategy="afterInteractive" />
    </main>
  );
}
