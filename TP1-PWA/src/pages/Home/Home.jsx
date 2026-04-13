import React, { useState } from "react";
import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";
import Modal from "../../Components/Modal/Modal";
import Etiqueta from "../../Components/Etiqueta/Etiqueta";
import Boton from "../../Components/Boton/Boton";
import BarraBusqueda from "../../Components/BarraBusqueda/BarraBusqueda";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultados, setResultados] = useState([]);
  return (
    <>
      <div>
        <Titulo texto="Este es el título" />
        <h1 className={`${styles.centrado} ${styles.titulo}`}>Home</h1>
      </div>
      <div>
        <Boton
          texto="Botón para abrir el modal"
          onClick={() => setIsModalOpen(true)}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
      <div>
        <Etiqueta nombre="Ejemplo de etiqueta" />
        <Etiqueta nombre="Otra etiqueta" />
      </div>
      <div>
        <Boton texto="Click!" type="button" />
      </div>
      <div>
        <BarraBusqueda />
        <ul>
          {resultados.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
