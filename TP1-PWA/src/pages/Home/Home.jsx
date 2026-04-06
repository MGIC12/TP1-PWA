import React from "react";
import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";
import Boton from "../../Components/Boton/Boton";

export default function Home() {
  return (
    <div>
      <Titulo />
      <h1 className={`${styles.centrado} ${styles.titulo}`}>Home</h1>
      <Boton/>
    </div>
  );
}
