import React from "react";

export default function Titulo({ texto }) {
  return (
    <h1
      style={{
        color: "black",
        fontSize: "40px",
        textAlign: "center",
        margin: "10px",
        backgroundColor: "lightblue",
      }}
    >
      {texto}
    </h1>
  );
}
