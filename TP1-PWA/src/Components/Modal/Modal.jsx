import React from "react";
import styles from "./Modal.module.css";
import Boton from "../Boton/Boton";

export default function Modal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nuevoItem = Object.fromEntries(formData.entries());

    nuevoItem.id = Date.now();

    onSave(nuevoItem);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} title="Cerrar">
          &times;
        </button>

        <h2>Nuevo Ítem</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="titulo"
              placeholder="Ej: Matrix"
              required
            />
          </label>

          <label>
            Director:
            <input
              type="text"
              name="director"
              placeholder="Ej: Hermanas Wachowski"
              required
            />
          </label>

          <div className={styles.row}>
            <label style={{ flex: 1 }}>
              Año:
              <input
                type="number"
                name="anio"
                min="1888"
                placeholder="Ej: 1999"
                required
              />
            </label>

            <label style={{ flex: 1 }}>
              Rating (1-10):
              <input
                type="number"
                name="rating"
                min="1"
                max="10"
                placeholder="1-10"
                required
              />
            </label>
          </div>

          <label>
            Género:
            <select name="genero" required defaultValue="">
              <option value="" disabled>
                Seleccione...
              </option>
              <option value="Accion">Acción</option>
              <option value="Comedia">Comedia</option>
              <option value="Drama">Drama</option>
              <option value="Ciencia Ficcion">Ciencia Ficción</option>
              <option value="Terror">Terror</option>
            </select>
          </label>

          <div className={styles.row}>
            <label style={{ flex: 1 }}>
              Tipo:
              <select name="tipo">
                <option value="pelicula">Película</option>
                <option value="serie">Serie</option>
              </select>
            </label>

            <label style={{ flex: 1 }}>
              Estado:
              <select name="estado" required defaultValue="por-ver">
                <option value="vista">Ya la vi (Vistas)</option>
                <option value="por-ver">Quiero verla (Por Ver)</option>
              </select>
            </label>
          </div>

          <div className={styles.buttonContainer}>
            <Boton
              texto={"Guardar"}
              className={styles.botonDelModal}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
