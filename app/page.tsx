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
        <h1>Interactive Gradient Background</h1>
        <p>
          A shimmering, ever-changing gradient rendered in WebGL. Sit back and
          enjoy the ambient motion.
        </p>
      </div>
      <Script src="/gradient.js" strategy="afterInteractive" />
    </main>
  );
}
