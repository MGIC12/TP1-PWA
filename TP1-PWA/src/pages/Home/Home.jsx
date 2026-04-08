import React, { useState } from "react";
import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";
import Modal from "../../Components/Modal/Modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
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
    </>
  );
}
