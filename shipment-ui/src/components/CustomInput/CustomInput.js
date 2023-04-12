import React from "react";
import "./CustomInput.css";

export default function CustomInput(props) {
  const { icon, placeholder, onChange } = props;

  const onValueChange = (event) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <div className="custom-input">
      <div className="custom-input-icon">{icon} </div>
      <div className="custom-input-input">
        <input
          style={{ border: "none", padding: "0.5rem 1rem", background: "none" }}
          type="text"
          placeholder={placeholder}
          onChange={onValueChange}
        />
      </div>
    </div>
  );
}
