import React from "react";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Welcome to Space Travel</h1>
      <p className={styles.home__description}>
        Manage spacecraft and evacuate humanity from Earth to habitable planets!
      </p>
      <a href="/spacecrafts" className={styles.home__link}>
        Get Started
      </a>
    </div>
  );
}

export default Home;