import React from "react";
import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";

export default function Home() {
  return (
    <div>
      <Titulo texto="Este es el título" />
      <h1 className={`${styles.centrado} ${styles.titulo}`}>Home</h1>
    </div>
  );
}
