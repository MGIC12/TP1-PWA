import React, { useState } from "react";
import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";
import Modal from "../../Components/Modal/Modal";
import Etiqueta from "../../Components/Etiqueta/Etiqueta";
import TarjetaContenido from "../../Components/TarjetaContenido/TarjetaContenido";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.Home}>
      <div>
        <Titulo texto="Este es el título" />
        <h1 className={`${styles.centrado} ${styles.titulo}`}>Home</h1>
      </div>
      <div>
        <button onClick={() => setIsModalOpen(true)}>
          Botón para abrir el modal
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
      <div>
        <Etiqueta nombre="Ejemplo de etiqueta" /> 
        <Etiqueta nombre="Otra etiqueta" />
      </div>
      <div>
        <TarjetaContenido objContenido={{
          titulo: "El Padrino",
          anio: 1972,
          director: "Francis Ford Coppola",
          colGeneros: ["Drama", "Crimen", "Thriller", "Mafia"],
          rating: 9.2,
          tipo: "Película"
        }} />

      </div>
    </div>
  );
}
