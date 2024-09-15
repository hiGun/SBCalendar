import React from "react";

const OptionsPanel = ({ options, onChange }) => {
  return (
    <div style={{ marginLeft: "20px" }}>
      <h3>Options</h3>
      {Object.entries(options).map(([key, { text, color }]) => {
        // Skip rendering the Clear option
        if (key === "Clear") return null;
        return (
          <div key={key} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={text}
              onChange={(e) => onChange(key, e.target.value, color)}
              style={{ backgroundColor: color }}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(key, text, e.target.value)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OptionsPanel;
