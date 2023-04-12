import React from "react";
import "./CustomButton.css";

export default function CustomButton(props) {
  const { text, onClick } = props;
  return (
    <div className="custom-button">
      <button className="custom-button-button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
