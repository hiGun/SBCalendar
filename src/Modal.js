import React from "react";

const modalStyle = {
  fontFamily: "'Source Code Pro', 'Courier New', monospace, ",
  fontWeight: "bold",
};

const Modal = ({ options, onSelect, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "lightgray",
        padding: "4px",
        border: "4px solid #ccc",
        ...modalStyle,
      }}
    >
      {Object.entries(options).map(([key, { text, color }]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          style={{
            backgroundColor: color,
            margin: "5px",
            padding: "10px",
            ...modalStyle,
          }}
        >
          {text}
        </button>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Modal;
