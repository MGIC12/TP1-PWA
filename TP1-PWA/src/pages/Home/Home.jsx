import React from "react";
import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo";

export default function Home() {
  return (
    <div>
      <Titulo />
      <h1 className={`${styles.centrado} ${styles.titulo}`}>Home</h1>
    </div>
  );
}
