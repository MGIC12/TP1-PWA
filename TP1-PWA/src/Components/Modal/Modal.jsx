import React from "react";
import styles from "./Modal.module.css";
import Boton from "../Boton/Boton";

export default function Modal({ isOpen, onClose, onSave, itemEditando }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nuevoItem = Object.fromEntries(formData.entries());

    // 1. SOLUCIÓN AL ID: Conservamos el original si estamos editando
    nuevoItem.id = itemEditando ? itemEditando.id : Date.now();

    onSave(nuevoItem);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} title="Cerrar">
          &times;
        </button>

        {/* Cambia el título dependiendo de la acción */}
        <h2>{itemEditando ? "Editar Ítem" : "Nuevo Ítem"}</h2>

        {/* 2. LA KEY ES VITAL: Fuerza a React a recargar los inputs si cambias de película */}
        <form
          key={itemEditando ? itemEditando.id : "nuevo"}
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <label>
            Título:
            <input
              type="text"
              name="titulo"
              placeholder="Ej: Matrix"
              defaultValue={itemEditando?.titulo || ""}
              required
            />
          </label>

          <label>
            Director:
            <input
              type="text"
              name="director"
              placeholder="Ej: Hermanas Wachowski"
              defaultValue={itemEditando?.director || ""}
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
                defaultValue={itemEditando?.anio || ""}
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
                defaultValue={itemEditando?.rating || ""}
                required
              />
            </label>
          </div>

          <label>
            Género:
            <select
              name="genero"
              required
              defaultValue={itemEditando?.genero || ""}
            >
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
              <select
                name="tipo"
                defaultValue={itemEditando?.tipo || "pelicula"}
              >
                <option value="pelicula">Película</option>
                <option value="serie">Serie</option>
              </select>
            </label>

            <label style={{ flex: 1 }}>
              Estado:
              <select
                name="estado"
                required
                defaultValue={itemEditando?.estado || "por-ver"}
              >
                <option value="vista">Ya la vi (Vistas)</option>
                <option value="por-ver">Quiero verla (Por Ver)</option>
              </select>
            </label>
          </div>

          <div className={styles.buttonContainer}>
            <Boton
              texto={itemEditando ? "Actualizar" : "Guardar"}
              className={styles.botonDelModal}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
